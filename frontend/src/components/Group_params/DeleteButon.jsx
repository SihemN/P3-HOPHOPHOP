/* eslint-disable no-alert */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

function DeleteButon() {
  const navigate = useNavigate();
  const { ug_group_id } = JSON.parse(localStorage.getItem("group"));

  const handleDeleteGroup = async (e) => {
    if (window.confirm("Etes-vous sûr(e) de vouloir supprimer le groupe ?"))
      try {
        const response = await fetch(
          `http://localhost:3310/api/groups/${ug_group_id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          e.preventDefault();
          localStorage.removeItem("group");
          navigate("/home");
        } else {
          const errorResponse = await response.json();
          throw new Error(errorResponse || "erreur pour supprimer le groupe");
        }
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <button
      type="button"
      onClick={handleDeleteGroup}
      className="mx-auto px-16 min-w-36 h-10 lg:h-9 border-[1px] border-dark-default rounded-xl bg-red-default  text-cream font-bold active:brightness-110 text-lg flex items-center justify-center font-Neue-Kabel shadow-lg md:max-w-80 my-1 lg:my-1 transition-transform transform-gpu hover:scale-110"
    >
      Supprimer le groupe
    </button>
  );
}

export default DeleteButon;
