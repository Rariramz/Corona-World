import logo from "./logo.svg";
import Earth from "./three/Earth.js";
import "./nullstyle.css";
import "./style.css";
import GlobalTotals from "./components/GlobalTotals";
import CountryInfo from "./components/CountryInfo";
import TestButtons from "./components/TestButtons";

function App() {
  return (
    <>
      <GlobalTotals />
      <CountryInfo />
      <Earth />
      {/* <TestButtons /> */}
    </>
  );
}

export default App;
