/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import HiDotsMenu from "./HiDotsMenu";

export default function TaskListContainer() {
  const [taskCategory, setTaskCategory] = useState([]);

  useEffect(() => {
    const fetchTaskCategory = async () => {
      const { ug_group_id } = JSON.parse(localStorage.getItem("group"));

      try {
        console.info("ug_group_id", ug_group_id);
        const response = await fetch(
          `http://localhost:3310/api/tasks-categories/groups/${ug_group_id}`,
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
          const data = await response.json();
          setTaskCategory(data.result);
        } else if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(
            errorResponse || "Problème pour récupérer les données demandées!!"
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des catégories public de tâches"
        );
      }
    };
    fetchTaskCategory();
  }, []);

  return (
    <div className="relative rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom shadow-top lg:p-5">
      <div>
        <ul>
          {taskCategory &&
            taskCategory.length > 0 &&
            taskCategory.map((category) => (
              <li key={category.cta_id}>
                <div className="bg-orange-light py-2 m-2 rounded-xl">
                  <div className="flex justify-between items-center text-center p-2">
                    <div>{category.cta_name}</div>

                    <div>
                      <HiDotsMenu className="text-orange-default text-lg" />
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
