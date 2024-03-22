import { AiFillEdit } from "react-icons/ai";
import ghostTitle from "./assets/logo/ghost-title.svg";

function App() {
  return (
    <div className="App">
      App
      <h1 className="text-3xl text-green-default font-Neue-Kabel  font-bold italic">
        Hello Tailwind
      </h1>
      <AiFillEdit className="text-green-default" />
      <img src={ghostTitle} alt="logo hop hop hop fantôme" />
    </div>
  );
}

export default App;
