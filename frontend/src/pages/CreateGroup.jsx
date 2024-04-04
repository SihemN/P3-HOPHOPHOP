import GroupNameForm from "../components/Create_group/GroupNameForm";
import InvitationLink from "../components/Create_group/InvitationLink";
import InvitationMail from "../components/Create_group/InvitationMail";
import HeaderFunctionnalities from "../components/HeaderFunctionnalities";

export default function CreateGroup() {
  return (
    <div className="bg-blue-default h-screen">
      <header>
        <HeaderFunctionnalities
          title="Créer un groupe"
          color="text-blue-default"
        />
      </header>
      <main className="bg-cream h-screen shadow-top rounded-t-xl font-Neue-Kabel">
        <GroupNameForm />
        <InvitationMail />
        <InvitationLink />
      </main>
    </div>
  );
}
