import { useState } from "react";
import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import todolist from "../assets/icons-functionnalities/todolist.svg";
import ListOfTaskList from "../components/TodoList/ListOfTaskList";
import FooterAdd from "../components/TodoList/FooterAdd";

export default function List() {
  const [listUpdated, setListUpdated] = useState(false);
  return (
    <div className="bg-orange-default font-Neue-Kabel">
      <header>
        <HeaderFunctionnalities
          color="text-orange-default"
          title="To do List"
          icon={todolist}
        />
      </header>

      <main className="rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom shadow-top">
        <div>
          <ListOfTaskList
            listUpdated={listUpdated}
            setListUpdated={setListUpdated}
          />
        </div>
      </main>
      <FooterAdd setListUpdated={setListUpdated} />
    </div>
  );
}
