import React, { useState, useEffect } from "react";

function GroupList() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch("/api/groups/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setGroups(data))
      .catch((error) => console.error("Fetching error: ", error));
  }, []);

  return (
    <div>
      <ul>
        {groups.map((group) => (
          <li key={group.g_id}>{group.g_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GroupList;
