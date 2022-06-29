import "./nullstyle.css";
import "./style.css";
import GlobalCard from "./components/GlobalCard";
import CountryCard from "./components/CountryCard";
import ContinentCard from "./components/ContinentCard";
import Canvas from "./components/Canvas";

function App() {
  return (
    <>
      <GlobalCard />
      <CountryCard />
      <ContinentCard />
      <Canvas />
    </>
  );
}

export default App;
