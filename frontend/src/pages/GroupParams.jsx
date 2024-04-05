import React from "react";
import { MdGroups2 } from "react-icons/md";

import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import MapMembers from "../components/Group_params/MapMembers";
import ButtonLanding from "../components/ButtonLanding";

export default function GroupParams() {
  return (
    <div className="bg-blue-default h-screen">
      <header>
        <HeaderFunctionnalities
          title="Paramètres du groupe"
          color="text-blue-default"
        />
      </header>
      <main className="bg-cream h-screen shadow-top rounded-t-xl font-Neue-Kabel">
        <section>
          <div className="flex flex-col py-9 items-center">
            <MdGroups2 className="bg-blue-default text-cream w-16 h-16 rounded-full p-2" />
          </div>
          <MapMembers />
          <ButtonLanding text="Enregistrer" color="bg-blue-default" />
          <ButtonLanding
            text="Supprimer le groupe"
            color="bg-red-default"
            to="/home"
          />
        </section>
      </main>
    </div>
  );
}
