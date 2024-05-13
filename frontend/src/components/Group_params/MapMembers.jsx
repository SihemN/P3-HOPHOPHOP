/* eslint-disable no-alert */
/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { FaTrashCan } from "react-icons/fa6";
import MembersOfGroup from "./MembersOfGroup";

export default function MapMembers() {
  const { ug_group_id } = JSON.parse(localStorage.getItem("group"));
  const [members, setMembers] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/groups/${ug_group_id}/users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des membres du groupe"
          );
        }
        const data = await response.json();
        setMembers(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGroupMembers();

    const handleUserAdded = () => {
      fetchGroupMembers(); // Recharge les membres du groupe
    };

    window.addEventListener("user-added", handleUserAdded);

    // Nettoyage de l'écouteur d'événements
    return () => {
      window.removeEventListener("user-added", handleUserAdded);
    };
  }, [toggle]);

  const onAdminToggle = async (ug_user_id) => {
    const currentRole = members.find(
      (member) => member.ug_user_id === ug_user_id
    ).ug_user_role;

    const newRole = currentRole === "admin" ? "membre" : "admin";
    try {
      const response = await fetch(
        `http://localhost:3310/api/groups/${ug_group_id}/users/${ug_user_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: JSON.stringify({ newRole }),
        }
      );
      if (!response.ok) {
        const errorMsg = await response.json();
        alert(errorMsg || "erreur lors de la mise à jour");

        throw new Error(
          errorMsg || "Erreur lors de la mise à jour du rôle de l'utilisateur"
        );
      }
      setToggle((prevToggle) => !prevToggle);

      alert("Rôle de l'utilisateur mis à jour avec succès");
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const handleDeleteMember = async (e, userId, ug_user_role) => {
    if (window.confirm("Etes-vous sûr(e) de vouloir supprimer le contact ?"))
      try {
        const response = await fetch(
          `http://localhost:3310/api/groups/${ug_group_id}/users/${userId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ action: "delete", ug_user_role }),
          }
        );

        if (response.ok) {
          e.preventDefault();
          // créé un nouveau tableau en exluant le membre à supprimer
          setMembers((currentMembers) =>
            currentMembers.filter((member) => member.ug_user_id !== userId)
          );
        } else {
          const errorResponse = await response.json();
          alert("Non autorisé, vous êtes le seul admin.");
          throw new Error(errorResponse || "erreur pour supprimer le membre");
        }
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div className="flex flex-col items-center mx-2">
      <h1 className="font-bold text-xl pl-2">Membres du groupe</h1>
      {members.map(({ ug_user_id, u_name, ug_user_role }) => {
        return (
          <div
            key={ug_user_id}
            className="flex w-full items-center justify-between bg-green-lightest my-3 h-14 rounded-lg px-4 md:w-3/4 lg:w-96"
          >
            <MembersOfGroup
              memberName={u_name}
              role={ug_user_role}
              ug_user_id={ug_user_id}
              onAdminToggle={() => onAdminToggle(ug_user_id)}
              updateRoleUser={onAdminToggle}
            />
            <FaTrashCan
              onClick={(e) => handleDeleteMember(e, ug_user_id, ug_user_role)}
              className="text-dark-default cursor-pointer"
            />
          </div>
        );
      })}
    </div>
  );
}
