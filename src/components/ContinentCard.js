import casesImg from "../images/coronavirus.png";
import deathsImg from "../images/skull.png";
import recoveredImg from "../images/heart.png";
import warningImg from "../images/warning.png";

import {
  useContinentError,
  useContinentTotals,
} from "../redux/continent/continentSelectors.js";

const ContinentCard = () => {
  const continentTotals = useContinentTotals();
  const continentError = useContinentError();

  return continentTotals && !continentError ? (
    <div className="continentInfo__column column">
      <div className="vertical-panel panel">
        <div className="vertical-panel__point point">
          <div className="point__title point__title_high continent-name">
            {continentTotals.continent.toUpperCase()}
          </div>
        </div>
        <div className="vertical-panel__point point">
          <div className="row">
            <div className="point__title">population:&nbsp;</div>
            <div className="point__info">
              {continentTotals.population.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">active:&nbsp;</div>
            <div className="point__info">
              {continentTotals.active.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">tests:&nbsp;</div>
            <div className="point__info">
              {continentTotals.tests.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">today cases:&nbsp;</div>
            <div className="point__info">
              {continentTotals.todayCases.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">today deaths:&nbsp;</div>
            <div className="point__info">
              {continentTotals.todayDeaths.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">today recovered:&nbsp;</div>
            <div className="point__info">
              {continentTotals.todayRecovered.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="vertical-panel__point point">
          <div className="row">
            <img className="row__img point__img" src={casesImg} alt="icon" />
            <div className="point__info point__info_red">
              {continentTotals.cases.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="vertical-panel__point point">
          <div className="row">
            <img className="row__img point__img" src={deathsImg} alt="icon" />
            <div className="point__info point__info_red">
              {continentTotals.deaths.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="vertical-panel__point point">
          <div className="row">
            <img
              className="row__img point__img"
              src={recoveredImg}
              alt="icon"
            />
            <div className="point__info point__info_red">
              {continentTotals.recovered.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="continentInfo__column column">
      <div className="vertical-panel panel">
        <div className="vertical-panel__point point">
          <div className="row">
            <img className="row__img point__img" src={warningImg} alt="icon" />
            {continentError ? (
              <div className="point__info">{continentError.message}</div>
            ) : (
              <div className="point__info">Choose continent</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinentCard;
