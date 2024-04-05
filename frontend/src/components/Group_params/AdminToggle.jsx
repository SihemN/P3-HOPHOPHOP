import { useState } from "react";
import { BsToggle2On, BsToggle2Off } from "react-icons/bs";

export default function AdminToggle() {
  const [isToggled, setIsToggled] = useState(false);
  const onToggle = () => setIsToggled(!isToggled);

  return (
    <div className="ml-4">
      {isToggled ? (
        <BsToggle2On
          size={30}
          onClick={onToggle}
          className="text-blue-default cursor-pointer"
        />
      ) : (
        <BsToggle2Off
          size={30}
          onClick={onToggle}
          className="text-dark-shadow cursor-pointer"
        />
      )}
    </div>
  );
}
