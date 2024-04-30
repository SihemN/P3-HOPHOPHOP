/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import ToggleTask from "./ToggleCheckTask";

function EditTask() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskUpdated, setTaskUpdated] = useState(false);

  const currentCategoryTask = JSON.parse(
    localStorage.getItem("categoryTaskId")
  );

  const currentCategoryName = JSON.parse(localStorage.getItem("categoryName"));

  const { ug_group_id } = JSON.parse(localStorage.getItem("group"));

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
          const { result } = await response.json();
          const tasksWithDone = result.map((task) => ({
            ...task,
            done: task.ta_done, // On ajoute une propriété "done" à chaque objet tâche
          }));
          setTasks(tasksWithDone);
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
        `http://localhost:3310/api/tasks/groups/${ug_group_id}/categories/${currentCategoryTask}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: JSON.stringify({ name: newTask, done: false }), // On ajoute la propriété "done" à false pour chaque nouvelle tâche
        }
      );
      if (response.ok) {
        const { message } = await response.json();
        setNewTask("");
        setTaskUpdated((prev) => !prev);
        console.info("message", message);
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse || "Problème pour créer la tâche");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche:", error);
    }
  };

  const toggleTask = async (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.ta_id === taskId);
    const newTasks = [...tasks];
    newTasks[taskIndex] = {
      ...newTasks[taskIndex],
      done: !newTasks[taskIndex].done, // On inverse la valeur de la propriété "done" de la tâche correspondante
    };
    setTasks(newTasks);

    try {
      const response = await fetch(
        `http://localhost:3310/api/tasks/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: JSON.stringify({ done: newTasks[taskIndex].done }), // On met à jour la propriété "done" dans la base de données
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse || "Problème pour mettre à jour la tâche"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche:", error);
    }
  };

  const removeTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:3310/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      if (response.ok) {
        const newTasks = tasks.filter((task) => task.ta_id !== taskId);
        setTasks(newTasks);
        setTaskUpdated((prev) => !prev);
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse || "Problème pour supprimer la tâche");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche:", error);
    }
  };

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
          {tasks.map(
            (
              { ta_id, ta_name, done } // On utilise la propriété "done" à la place de "ta_done"
            ) => (
              <li
                key={ta_id}
                className="flex items-center justify-between mb-2"
              >
                <div className="flex items-center">
                  <ToggleTask
                    taskId={ta_id}
                    taskDone={done} // On passe la propriété "done" en tant que prop "taskDone"
                    onToggle={() => toggleTask(ta_id)}
                  />
                  <label
                    htmlFor={`checkbox-${ta_id}`}
                    className={`${
                      done ? "line-through text-orange-lighter" : ""
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
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default EditTask;
