/* eslint-disable react/prop-types */
import { GoPeople } from "react-icons/go";
import { IoTimeOutline } from "react-icons/io5";

export default function ShowRecipeIconsDetails({ icon, content }) {
  return (
    <div className="flex flex-col items-center justify-center">
      {icon === "Persons" && <GoPeople className="text-red-default text-3xl" />}
      {icon === "Time" && (
        <IoTimeOutline className="text-red-default text-3xl" />
      )}
      {content}
    </div>
  );
}
