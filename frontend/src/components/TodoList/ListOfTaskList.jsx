import React from "react";
import HiDotsMenu from "./HiDotsMenu";

const taskList = [
  {
    title: "Courses scolaire",
    type: "private",
  },
  {
    title: "Administratif",
    type: "private",
  },
  {
    title: "Goals week",
    type: "private",
  },
  {
    title: "Ménage de la semaine",
    type: "public",
  },
  {
    title: "Courses semaine",
    type: "public",
  },
  {
    title: "À faire",
    type: "public",
  },
];

export default function TaskList() {
  return (
    <div className="flex flex-col justify-center p-10">
      <h2 className="text-2xl font-bold">TO DO LIST DU GROUPE</h2>
      <ul>
        {taskList
          .filter((task) => task.type === "public")
          .map((task) => (
            <li key={task.title}>
              <div className="bg-orange-light py-2 m-2 rounded-xl">
                <div className="flex justify-between items-center text-center p-2">
                  <div>{task.title}</div>
                  <div>
                    <HiDotsMenu className="text-orange-default text-lg" />
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>

      <h2 className="text-2xl font-bold mt-5">TO DO LIST PRIVEES</h2>
      <ul>
        {taskList
          .filter((task) => task.type === "private")
          .map((task) => (
            <li key={task.title}>
              <div className="bg-orange-light py-2 m-2 rounded-xl">
                <div className="flex justify-between items-center text-center p-2">
                  <div>{task.title}</div>
                  <div>
                    <HiDotsMenu className="text-orange-default text-lg" />
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
