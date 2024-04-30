/* eslint-disable no-undef */
/* eslint-disable camelcase */
import { useState, useEffect } from "react";

export default function MapTaskListPublic() {
  const [publicCategories, setPublicCategories] = useState([]);

  // eslint-disable-next-line camelcase

  // console.log("publicCategories", publicCategories);

  useEffect(() => {
    const fetchPublicCategories = async () => {
      try {
        const { ug_group_id } = JSON.parse(localStorage.getItem("group"));

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
          setPublicCategories(data.result);
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
    fetchPublicCategories();
  }, []);

  return (
    <div className="bg-green-lighter">
      <h2>Listes de tâches privées pour l'utilisateur</h2>
      {!publicCategories.length ? (
        <p>Aucune liste de tâches public trouvée</p>
      ) : (
        <ul>
          {publicCategories.map((category) => (
            <li key={category.cta_name}>{category.cta_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
