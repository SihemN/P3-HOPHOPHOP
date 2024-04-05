/* eslint-disable react/prop-types */
import React from "react";
import AdminToggle from "./AdminToggle";

export default function MembersOfGroup({ memberName }) {
  return (
    <div className="flex gap-9 font-semibold text-lg pl-2 items-center pt-1">
      <div className="my-2">{memberName}</div>
      <div className="rounded-full px-2 py-1 ml-2 flex">
        Admin
        <AdminToggle />
      </div>
    </div>
  );
}
