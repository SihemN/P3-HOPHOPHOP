import React from "react";
import TeamMembers from "./TeamMembers";

import teamMember1 from "../assets/logo/ghost-blue.svg";
import teamMember2 from "../assets/logo/ghost-green.svg";

function TeamComponant() {
  return (
    <>
      <h1 className="text-center text-xl pb-6 font-extrabold">LA TEAM</h1>
      <div className="flex flex-row flex-wrap gap-2 justify-center">
        <TeamMembers
          color="bg-orange-lighter"
          image={teamMember1}
          name="Anaïs"
        />
        <TeamMembers
          color="bg-blue-lighter"
          image={teamMember2}
          name="Arthur"
        />
        <TeamMembers
          color="bg-green-lighter"
          image={teamMember1}
          name="Sihem"
        />
        <TeamMembers color="bg-red-lighter" image={teamMember2} name="Soumia" />
      </div>
    </>
  );
}

export default TeamComponant;
