/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";

function EditTask() {
  const [tasks, setTasks] = useState([]);
  // console.info("tasks", tasks);
  const [newTask, setNewTask] = useState("");
  const [taskUpdated, setTaskUpdated] = useState(false);

  const currentCategoryTask = JSON.parse(
    localStorage.getItem("categoryTaskId")
  );
  console.info("currentCategoryTask", currentCategoryTask);

  const currentCategoryName = JSON.parse(localStorage.getItem("categoryName"));

  //  const currentTask = JSON.parse(localStorage.getItem("task"));

  const { ug_group_id } = JSON.parse(localStorage.getItem("group"));
  console.info("ug_group_id", ug_group_id);
  console.info("currentCategoryName", currentCategoryName);

  console.info("currentCategoryTask", currentCategoryTask);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/tasks/categories/${currentCategoryTask}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        if (response.ok) {
          const { message, result } = await response.json();
          setTasks(result);
          console.info("message", message);
        } else if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(
            errorResponse || "Problème pour récupérer les données"
          );
        } else {
          console.error(
            "Erreur lors de la récupération de la catégorie de tâches"
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la catégorie de tâches:",
          error
        );
      }
    };

    fetchCategory();
  }, [taskUpdated]);

  const addTask = async () => {
    try {
      const response = await fetch(
        // eslint-disable-next-line camelcase
        `http://localhost:3310/api/tasks/groups/${ug_group_id}/categories/${currentCategoryTask}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: JSON.stringify({ name: newTask, done: false }),
        }
      );
      console.info("newTask", newTask);
      console.info("response", response);
      if (response.ok) {
        const { message } = await response.json(); // Extraire le message et le résultat de la réponse JSON
        setNewTask("");
        // prev= prends la preview values
        setTaskUpdated((prev) => !prev);
        console.info("message", message); // Afficher le message dans la console
      } else {
        // Si la réponse de la requête n'est pas OK
        const errorResponse = await response.json(); // Extraire la réponse d'erreur au format JSON
        throw new Error(errorResponse || "Problème pour créer la tâche"); // Lancer une erreur avec le message d'erreur ou un message par défaut
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche:", error);
    }
  };

  const removeTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  const toggleTask = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const task = tasks[taskIndex];
    const updatedTask = { ...task, completed: !task.completed };
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;
    setTasks(updatedTasks);
  };
  console.info("tasks", tasks);

  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h1 className="bg-orange-default rounded-3xl text-cream text-xl p-2 text-center w-full mb-4 outline-none">
          {currentCategoryName}
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
          className="flex mb-4"
        >
          <input
            type="text"
            placeholder="Ajouter un élément à la liste"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            required
            className="rounded-3xl border-2 border-orange-light shadow-sm p-2 w-full mr-2 outline-none"
          />
        </form>
        <ul>
          {tasks.map(({ ta_id, ta_name, ta_done }) => (
            <li key={ta_id} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <IoMdCheckmarkCircleOutline
                  onClick={() => toggleTask(ta_id)}
                  className={`mr-3 cursor-pointer ${
                    ta_done ? "text-green-default" : "text-orange-lighter"
                  }`}
                />
                <label
                  htmlFor={`checkbox-${ta_id}`}
                  className={`${
                    ta_done ? "line-through text-orange-lighter" : ""
                  }`}
                >
                  <div className="flex flex-wrap w-52">{ta_name}</div>
                </label>
              </div>
              <FaTrashAlt
                onClick={() => removeTask(ta_id)}
                className="text-red-lighter text-sm cursor-pointer"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EditTask;
