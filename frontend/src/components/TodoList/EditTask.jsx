import React, { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";

function EditTask() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [title, setTitle] = useState("Courses de la semaine");

  const addTask = () => {
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask("");
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

  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-orange-default rounded-3xl text-cream text-xl p-2 text-center w-full mb-4 outline-none"
        />
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
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between mb-2"
            >
              <div className="flex items-center">
                <IoMdCheckmarkCircleOutline
                  onClick={() => toggleTask(task.id)}
                  className={`mr-3 cursor-pointer ${
                    task.completed
                      ? "text-green-default"
                      : "text-orange-lighter"
                  }`}
                />
                <label
                  htmlFor={`checkbox-${task.id}`}
                  className={`${
                    task.completed ? "line-through text-orange-lighter" : ""
                  }`}
                >
                  <div className="flex flex-wrap w-52">{task.text}</div>
                </label>
              </div>
              <FaTrashAlt
                onClick={() => removeTask(task.id)}
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
