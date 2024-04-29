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
        throw new Error(
          "Erreur lors de la mise à jour du rôle de l'utilisateur"
        );
      }

      alert("Rôle de l'utilisateur mis à jour avec succès");

      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.ug_user_id === ug_user_id
            ? { ...member, ug_user_role: newRole }
            : member
        )
      );
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du rôle de l'utilisateur :",
        error
      );
    } finally {
      setToggle((prevToggle) => !prevToggle);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-xl pl-2">Membres du groupe</h1>
      {members.map(({ ug_user_id, u_name, ug_user_role }) => {
        return (
          <div
            key={ug_user_id}
            className="flex items-center justify-between bg-green-lightest my-3 h-14 rounded-lg mx-2 px-4"
          >
            <MembersOfGroup
              memberName={u_name}
              role={ug_user_role}
              ug_user_id={ug_user_id}
              onAdminToggle={() => onAdminToggle(ug_user_id)}
              updateRoleUser={onAdminToggle}
            />
            <FaTrashCan className="text-dark-default cursor-pointer" />
          </div>
        );
      })}
    </div>
  );
}
