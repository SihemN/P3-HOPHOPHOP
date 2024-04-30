/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Switch from "@mui/material/Switch";

export default function AdminToggle({ onAdminToggle, ug_user_id, role }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    onAdminToggle(ug_user_id);
  };
  return (
    <div>
      <Switch
        checked={role === "admin"}
        onChange={handleChange}
        name="checkedSwitch"
        inputProps={{ "aria-label": "controlled" }}
      />
      {isChecked ? "" : ""}
    </div>
  );
}
