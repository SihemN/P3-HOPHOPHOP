/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import MembersOfGroup from "./MembersOfGroup";

export default function MapMembers() {
  // récupère id du group et id du user
  const { ug_group_id, ug_user_id: currentUserId } = JSON.parse(
    localStorage.getItem("group")
  );
  const [members, setMembers] = useState([]);
  // Booléen qui indique si le user actuel est admin
  const [isAdmin, setIsAdmin] = useState(false);
  // console.log("isAdmin", isAdmin);
  // booléen pour savoir si le user est le seul admin
  const [isSingleAdmin, setIsSingleAdmin] = useState(false);
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

        const adminCount = data.results.filter(
          (member) => member.ug_user_role === "admin"
        ).length;
        const currentUserIsAdmin = data.results.some(
          (member) =>
            member.ug_user_id === currentUserId &&
            member.ug_user_role === "admin"
        );
        setIsAdmin(currentUserIsAdmin);
        setIsSingleAdmin(adminCount === 1 && currentUserIsAdmin);
        // console.log("je suis dans le useeffect");
      } catch (error) {
        console.error(error);
      }
    };
    fetchGroupMembers();
  }, [toggle]);

  const handleAdminChange = async (ug_user_id, newAdminStatus, currentRole) => {
    if (
      isSingleAdmin &&
      currentUserId === ug_user_id &&
      currentRole === "admin"
    ) {
      alert("Action non autorisée: Vous êtes le seul admin du groupe.");
      return;
    }
    const newRole = newAdminStatus ? "admin" : "membre";
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
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(`Failed to update user role: ${errMsg}`);
      }
      setMembers(
        members.map((member) =>
          member.ug_user_id === ug_user_id
            ? { ...member, ug_user_role: newRole }
            : member
        )
      );
      alert("Le rôle de l'utilisateur a été mis à jour avec succès.");
    } catch (error) {
      console.error(error);
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
              ug_user_id={ug_user_id}
              isAdmin={ug_user_role === "admin"}
              setToggle={setToggle}
              // eslint-disable-next-line no-shadow
              handleAdminChange={(_isAdmin) =>
                handleAdminChange(
                  ug_user_id,
                  ug_user_role !== "admin",
                  ug_user_role
                )
              }
              isSingleAdmin={isSingleAdmin}
              currentUserId={currentUserId}
            />
            <FaTrashCan className="text-dark-default cursor-pointer" />
          </div>
        );
      })}
    </div>
  );
}
