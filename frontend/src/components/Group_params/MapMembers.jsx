import { FaTrashCan } from "react-icons/fa6";
import MembersOfGroup from "./MembersOfGroup";

export default function MapMembers() {
  const members = [
    { id: 1, memberName: "Anaïs" },
    { id: 2, memberName: "Soumia" },
    { id: 3, memberName: "Sihem" },
    { id: 4, memberName: "Arthur" },
  ];
  return (
    <div>
      <h1 className="font-bold text-xl pl-2">Membres du groupe</h1>
      {members.map(({ memberName, id }) => {
        return (
          <div
            key={id}
            className="flex items-center justify-between bg-green-lightest my-3 h-14 rounded-lg mx-2 px-4"
          >
            <MembersOfGroup memberName={memberName} />
            <FaTrashCan className="text-dark-default cursor-pointer" />
          </div>
        );
      })}
    </div>
  );
}
