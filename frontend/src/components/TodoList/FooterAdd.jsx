import { FaCirclePlus } from "react-icons/fa6";

export default function FooterAdd() {
  return (
    <div className="fixed z-10 flex justify-end w-full lg:mx-0 lg:w-[50%] lg:max-w-[800px] bottom-0 shadow-top bg-cream pr-5 py-3">
      <FaCirclePlus className="text-4xl text-orange-default" />
    </div>
  );
}
