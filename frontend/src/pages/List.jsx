import React from "react";

import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import todolist from "../assets/icons-functionnalities/todolist.svg";
// import TodoList from "../components/TodoList/TodoList";
import ListOfTaskList from "../components/TodoList/ListOfTaskList";

export default function List() {
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
          <ListOfTaskList />
        </div>
      </main>
    </div>
  );
}
