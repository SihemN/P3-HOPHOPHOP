/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useEffect } from "react";

function GroupList({ groups, setGroups, currentGroup, setCurrentGroup }) {
  const handleClick = (g_name, ug_group_id) => {
    localStorage.setItem(
      "group",
      // eslint-disable-next-line object-shorthand
      JSON.stringify({ g_name, ug_group_id })
    );
    return setCurrentGroup(JSON.parse(localStorage.getItem("group")));
  };

  function initCurrentGroup(results, group) {
    if (!group) {
      let currentStorage = localStorage.getItem("group");
      if (!currentStorage) {
        currentStorage = localStorage.setItem(
          "group",
          JSON.stringify(results[0])
        );
        return currentStorage;
      }

      return setCurrentGroup(JSON.parse(currentStorage));
    }
    return group;
  }

  useEffect(() => {
    const fetchGroupList = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token manquant");
        }

        const response = await fetch("http://localhost:3310/api/groups/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des groupes");
        }
        const { results } = await response.json();
        setGroups(results);
        initCurrentGroup(results, currentGroup);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGroupList();
    // console.info("currentGroup après INIT", currentGroup);
  }, []);

  return (
    <div>
      <ul className="pb-3 flex flex-col">
        {groups.map(({ g_name, ug_group_id }) => (
          <button
            className="hover:text-green-default"
            type="button"
            onClick={() => handleClick(g_name, ug_group_id)}
            key={ug_group_id}
            value={g_name}
          >
            <li>{g_name}</li>
          </button>
        ))}
      </ul>
    </div>
  );
}

export default GroupList;
