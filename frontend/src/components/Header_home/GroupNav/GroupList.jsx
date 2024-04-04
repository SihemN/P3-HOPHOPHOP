// import React, { useState, useEffect } from "react";

function GroupList() {
  // const [groups, setGroups] = useState([]);
  const groupes = [
    { id: 1, name: "groupe 1" },
    { id: 2, name: "group 2" },
  ];
  // useEffect(() => {
  //   fetch("/api/groups/users")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => setGroups(data))
  //     .catch((error) => console.error("Fetching error: ", error));
  // }, []);

  return (
    <div>
      <ul className="pb-3">
        {groupes.map(({ name, id }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GroupList;
