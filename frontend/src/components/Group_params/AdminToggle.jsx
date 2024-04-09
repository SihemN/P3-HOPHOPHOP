import { useState } from "react";
import Switch from "@mui/material/Switch";

export default function AdminToggle() {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <Switch
        checked={checked}
        onChange={handleChange}
        name="checkedSwitch"
        inputProps={{ "aria-label": "controlled" }}
      />
      {checked ? "On" : "Off"}
    </div>
  );
}
