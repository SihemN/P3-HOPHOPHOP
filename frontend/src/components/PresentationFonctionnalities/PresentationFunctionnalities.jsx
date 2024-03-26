import React from "react";
import SectionTitle from "./SectionTitle";
import MapFunctionnalities from "./MapFunctionnalities";

export default function PresentationFunctionnalities() {
  return (
    <div id="functionnalities" className="bg-cream md:h-[1000px] ">
      <SectionTitle title="LES FONCTIONNALITES" />
      <MapFunctionnalities />
    </div>
  );
}
