import React from "react";
import SectionTitle from "./SectionTitle";
import MapFunctionnalities from "./MapFunctionnalities";

export default function PresentationFunctionnalities() {
  return (
    <div id="functionality" className="bg-cream_dark tall:h-[1000px] ">
      <SectionTitle title="LES FONCTIONNALITES" />
      <MapFunctionnalities />
    </div>
  );
}
