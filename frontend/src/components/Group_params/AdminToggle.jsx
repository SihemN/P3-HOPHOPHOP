/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import Switch from "@mui/material/Switch";

export default function AdminToggle({ checked, onChange }) {
  return (
    <div>
      <Switch
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        name="checkedSwitch"
        inputProps={{ "aria-label": "controlled" }}
      />
      {checked ? "On" : "Off"}
    </div>
  );
}
