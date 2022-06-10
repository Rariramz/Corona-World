import React from "react";
import "./totals.css";

const InfoPoint = ({ img, title, data }) => {
  return (
    <>
      <img className="point__img" src={img} />
      <div className="point__title">{title}</div>
      <div className="point__info">{data}</div>
    </>
  );
};

export default InfoPoint;
