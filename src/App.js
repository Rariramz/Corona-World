import logo from "./logo.svg";
import Earth from "./three/Earth.js";
import "./style.css";
import GlobalTotals from "./components/GlobalTotals";
import CountryTotals from "./components/CountryTotals";

function App() {
  return (
    <>
      <GlobalTotals />
      <CountryTotals country={"china"} />
      <Earth />;
    </>
  );
}

export default App;
