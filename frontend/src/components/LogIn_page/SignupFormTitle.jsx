import { FaRegHandPointDown } from "react-icons/fa";

export default function SignupFormTitle() {
  return (
    <section className="flex flex-col items-center my-5">
      <h1 className=" text-2xl font-bold text-center px-10">
        Facilitez-vous la vie et inscrivez-vous !
      </h1>
      <FaRegHandPointDown className="m-3 text-3xl text-green-default" />
    </section>
  );
}
