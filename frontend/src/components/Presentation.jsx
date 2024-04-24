import ghostPink from "../assets/logo/ghost-pink.svg";

function Presentation() {
  return (
    <div id="about" className="flex flex-col items-center ">
      <div className="font-Neue-Kabel text-dark-default my-10 relative flex flex-col w-80 md:w-96">
        <div className="z-10 w-80 md:w-96 h-64 md:h-56 bg-green-lightest border-solid border border-dark rounded-2xl bg-green-clear p-5">
          <p className="font-medium  w-100%">
            Avec Hop Hop Hop, facilitez-vous la vie : on a réuni tout ce qu’il
            vous faut au même endroit !
          </p>
          <p className="pt-5 font-medium leading-5 w-100%">
            Agenda, to do list, documents, budgets, répertoire de contacts, fini
            les oublis qui viennent hanter vos nuits. Et vous serez bien
            accompagnés avec Hoppy, notre cher fantôme qui pense à tout. Et en
            plus il est mignon !
          </p>
        </div>
        <div className="absolute top-1 left-1 bg-red-lighter w-80 md:w-96  h-64 md:h-56 rounded-2xl border-solid border border-dark">
          {" "}
        </div>
        <div>
          <img
            src={ghostPink}
            alt="logo hop hop hop fantôme"
            className="absolute z-30 w-28 md:w-32 h-28 md:h-32 -bottom-16 md:-bottom-16 -right-8 md:-right-16 transform-gpu transition-transform hover:animate-spin-360"
          />
        </div>
      </div>
      <div className="font-Neue-Kabel text-dark-default mb-20 relative flex flex-col w-80 md:w-96">
        <div className="z-10 md:w-80 h-20 md:h-24 bg-green-lightest border-solid border border-dark rounded-2xl bg-green-clear p-5">
          <p className="font-medium leading-5 w-100%">
            Créez un groupe et invitez vos amis, votre famille, ou encore vos
            colocataires.
          </p>
        </div>
        <div className="absolute top-1 left-1 bg-red-lighter w-80 h-20 md:h-24 rounded-2xl border-solid border border-dark">
          {}
        </div>
      </div>
    </div>
  );
}

export default Presentation;
