import ghostTitle from "./assets/logo/ghost-title.svg";
import GroupNav from "./components/GroupNav/GroupNav";

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl text-green-default font-Neue-Kabel  font-bold italic">
        Hello Tailwind
      </h1>
      <img
        src={ghostTitle}
        alt="logo hop hop hop fantôme"
        className=" w-80 h-80"
      />
      <GroupNav />
    </div>
  );
}

export default App;
