import { MdGroups2 } from "react-icons/md";
import { FiSend } from "react-icons/fi";

import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import MapMembers from "../components/Group_params/MapMembers";
import AddUser from "../components/Group_params/AddUser";
import InvitationMail from "../components/Create_group/InvitationMail";
import InvitationLink from "../components/Create_group/InvitationLink";
import DeleteButon from "../components/Group_params/DeleteButon";

export default function GroupParams() {
  return (
    <div className="bg-blue-default h-screen">
      <header>
        <HeaderFunctionnalities
          title="Paramètres du groupe"
          color="text-blue-default"
        />
      </header>
      <main className="bg-cream h-screen shadow-top rounded-t-xl font-Neue-Kabel">
        <section>
          <div className="flex flex-col py-9 items-center">
            <MdGroups2 className="bg-blue-default text-cream w-16 h-16 rounded-full p-2" />
          </div>
          <MapMembers />
          <DeleteButon />
        </section>
        <section>
          <div className="flex flex-col py-9 items-center">
            <AddUser />
            <FiSend className="bg-blue-default text-cream w-16 h-16 rounded-full p-4" />
          </div>
          <div>
            <InvitationMail />
            <InvitationLink />
          </div>
        </section>
      </main>
    </div>
  );
}
