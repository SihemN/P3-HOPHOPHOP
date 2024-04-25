/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from "react";
import AdminToggle from "./AdminToggle";

export default function MembersOfGroup({
  memberName,
  ug_user_id,
  isAdmin,
  handleAdminChange,
  isSingleAdmin,
  currentUserId,
}) {
  return (
    <div className="flex gap-9 font-semibold text-lg pl-2 items-center pt-1">
      <div className="pb-3">{memberName}</div>
      <div className="rounded-full px-2 py-1 ml-2 flex">
        Admin
        <AdminToggle
          checked={isAdmin}
          onChange={(newAdminStatus) => {
            if (!(isSingleAdmin && ug_user_id === currentUserId && isAdmin)) {
              handleAdminChange(
                ug_user_id,
                !isAdmin,
                isAdmin ? "admin" : "membre"
              );
            } else {
              alert("Action non autorisée: Vous êtes le seul admin du groupe.");
            }
          }}
        />
      </div>
    </div>
  );
}
