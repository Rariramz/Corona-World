import Earth from "./three/Earth.js";
import "./nullstyle.css";
import "./style.css";
import GlobalCard from "./components/GlobalCard";
import CountryCard from "./components/CountryCard";
import TestButtons from "./components/TestButtons";
import ContinentCard from "./components/ContinentCard.js";

function App() {
  return (
    <>
      <GlobalCard />
      <TestButtons />
      <CountryCard />
      <ContinentCard />
      <Earth />
    </>
  );
}

export default App;
