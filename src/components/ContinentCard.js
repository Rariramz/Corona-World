import casesImg from "../images/coronavirus.png";
import deathsImg from "../images/skull.png";
import recoveredImg from "../images/heart.png";
import warningImg from "../images/warning.png";

import { useSelector } from "react-redux";
import { useGetContinentDataQuery } from "../redux/continent/continentSlice";

const ContinentCard = () => {
  const continentName = useSelector(
    (state) => state.userSelected.continentName
  );

  const {
    startedTimeStamp,
    data,
    isError,
    error,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetContinentDataQuery(continentName, { pollingInterval: 5000 });

  return isSuccess ? (
    <div className="continentInfo__column column">
      <div className="vertical-panel panel">
        <div className="vertical-panel__point point">
          <div className="point__title point__title_high continent-name">
            {data.continent.toUpperCase()}
          </div>
        </div>
        <div className="vertical-panel__point point">
          <div className="row">
            <div className="point__title">population:&nbsp;</div>
            <div className="point__info">
              {data.population.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">active:&nbsp;</div>
            <div className="point__info">{data.active.toLocaleString()}</div>
          </div>
          <div className="row">
            <div className="point__title">tests:&nbsp;</div>
            <div className="point__info">{data.tests.toLocaleString()}</div>
          </div>
          <div className="row">
            <div className="point__title">today cases:&nbsp;</div>
            <div className="point__info">
              {data.todayCases.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">today deaths:&nbsp;</div>
            <div className="point__info">
              {data.todayDeaths.toLocaleString()}
            </div>
          </div>
          <div className="row">
            <div className="point__title">today recovered:&nbsp;</div>
            <div className="point__info">
              {data.todayRecovered.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="vertical-panel__point point">
          <div className="row">
            <img className="row__img point__img" src={casesImg} alt="icon" />
            <div className="point__info point__info_red">
              {data.cases.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="vertical-panel__point point">
          <div className="row">
            <img className="row__img point__img" src={deathsImg} alt="icon" />
            <div className="point__info point__info_red">
              {data.deaths.toLocaleString()}
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
              {data.recovered.toLocaleString()}
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
            {isError ? (
              <div className="point__info">
                {error.status}: {error.data.message}
              </div>
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
