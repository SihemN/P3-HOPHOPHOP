/* eslint-disable no-alert */
import { useState } from "react";
import { MdGroups2 } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import RedStarForRequiredInput from "../to-reuse/RedStarForRequiredInput";

export default function GroupNameForm() {
  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName) {
      alert("Veuillez entrer un nom pour votre groupe");
      return;
    }
    try {
      const response = await fetch("http://localhost:3310/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({ name: groupName }),
      });
      // console.log("response", response);
      if (!response.ok) {
        throw new Error("Erreur lors de la création du groupe");
      }
      const { results } = await response.json();
      setGroupName(results);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setGroupName(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center py-9">
        <div className="bg-blue-default text-cream w-16 h-16 rounded-full flex justify-center items-center">
          <MdGroups2 size={40} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="w-72 flex flex-col">
        <label htmlFor="nom du groupe" className="font-bold text-start">
          Nom du groupe
          <RedStarForRequiredInput />
        </label>

        <div className="flex flex-col items-center gap-4 mt-3">
          <input
            type="text"
            placeholder="Nom du groupe"
            required
            className="w-72 border rounded-lg h-10 pl-2"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-default w-72 py-1 rounded-lg text-cream shadow-lg"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}
