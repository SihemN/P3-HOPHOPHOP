import { useState } from "react";
import AddEventButtonOpen from "./AddEventButtonOpen";
import AddEventForm from "./AddEventForm";

export default function AddEvent() {
  const [formIsOpen, setFormIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center pt-5">
      <AddEventButtonOpen setFormIsOpen={setFormIsOpen} />
      <AddEventForm formIsOpen={formIsOpen} setFormIsOpen={setFormIsOpen} />
    </div>
  );
}

// title, text, dateStart, dateEnd, isPrivate;
