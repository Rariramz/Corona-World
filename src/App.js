import React, { Suspense } from "react";
import "./nullstyle.css";
import "./style.css";
import Canvas from "./components/Canvas";
const GlobalCard = React.lazy(() => import("./components/GlobalCard"));
const CountryCard = React.lazy(() => import("./components/CountryCard"));
const ContinentCard = React.lazy(() => import("./components/ContinentCard"));

function App() {
  return (
    <>
      <Suspense fallback={
        <div class="loader">
          <div class="inner one"></div>
          <div class="inner two"></div>
          <div class="inner three"></div>
        </div>
      }>
        <GlobalCard />
        <CountryCard />
        <ContinentCard />
      </Suspense>
      <Canvas />
    </>
  );
}

export default App;
