import ghostTitle from "./assets/logo/ghost-title.svg";

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
    </div>
  );
}

export default App;
