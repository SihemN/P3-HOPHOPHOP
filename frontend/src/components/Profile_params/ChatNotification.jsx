import React from "react";

import Switch from "@mui/material/Switch";

export default function ChatNotification() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="p-4">
      <h1 className="font-semibold text-lg mb-2 mr-24">
        Notification de la messagerie
      </h1>
      <div className="flex items-center justify-between bg-green-lightest rounded-lg py-1">
        <p className="pl-2">Activer/ Désactiver</p>
        <Switch
          onChange={handleChange}
          checked={checked}
          offColor="#888"
          onColor="#00d1b2"
          className="react-switch"
        />
      </div>
    </div>
  );
}
