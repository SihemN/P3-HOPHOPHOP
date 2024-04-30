import React, { useState, useEffect } from "react";
import HiDotsMenu from "./HiDotsMenu";
import MApPublicTaskList from "./MapPublicTaskList";

export default function TaskListContainer() {
  const [taskCategory, setTaskCategory] = useState([]);

  // const currentCategoryTask = JSON.parse(
  // localStorage.getItem("categoryTaskId")
  // );

  useEffect(() => {
    const fetchTaskCategory = async () => {
      try {
        const response = await fetch(
          "http://localhost:3310/api/tasks-category/groups/"
        );
        if (response.ok) {
          const data = await response.json();
          setTaskCategory(data.taskCategory);
        } else {
          console.error("Erreur de récupération liste des tâches!");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la liste de tâches");
      }
    };
    fetchTaskCategory();
  }, []);

  return (
    <div className="flex flex-col justify-center p-10">
      <div className="bg-green-lighter">
        <MApPublicTaskList />
      </div>
      <h2 className="text-2xl font-bold">TO DO LIST DU GROUPE</h2>
      <ul>
        {taskCategory.map((task) => (
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
