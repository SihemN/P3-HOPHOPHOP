import ButtonAccessRefused from "./ButtonAccessRefused";

export default function RefusedAccess() {
  return (
    <div className="bg-cream h-screen flex flex-col justify-center items-center font-Neue-Kabel font-semibold">
      <h1 className="text-xl">Accès refusé, vous n'êtes pas connecté</h1>
      <div className="flex flex-col items-center justify-center w-screen px-5">
        <ButtonAccessRefused
          to="/login"
          text="Connexion"
          colorBg="bg-blue-default"
        />
        <ButtonAccessRefused
          to="/signup"
          text="Inscription"
          colorBg="bg-green-default"
        />
      </div>
    </div>
  );
}
