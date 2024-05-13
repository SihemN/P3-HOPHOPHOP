/* eslint-disable react/prop-types */
import { useState } from "react";
import AddEventButtonOpen from "./AddEventButtonOpen";
import AddEventForm from "./AddEventForm";

export default function AddEvent({ setEventUpdated }) {
  const [formIsOpen, setFormIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center pt-5">
      <AddEventButtonOpen setFormIsOpen={setFormIsOpen} />
      <AddEventForm
        formIsOpen={formIsOpen}
        setFormIsOpen={setFormIsOpen}
        setEventUpdated={setEventUpdated}
      />
    </div>
  );
}
