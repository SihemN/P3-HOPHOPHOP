import React from "react";
import TeamMembers from "./TeamMembers";
import teamMember1 from "../assets/logo/ghost-blue.svg";
import teamMember2 from "../assets/logo/ghost-green.svg";
import SectionTitle from "./Landing/PresentationFonctionnalities/SectionTitle";

function TeamComponant() {
  return (
    <>
      <SectionTitle title="LA TEAM" />
      <div className="flex flex-row flex-wrap gap-2 justify-center my-10">
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
