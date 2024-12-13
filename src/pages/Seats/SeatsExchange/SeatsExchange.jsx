import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ArrivalImage from "#assets/slider-filter-period-arrival.png";
import DepartureImage from "#assets/slider-filter-period-departure.png";
import "./SeatsExchange.css";

function SeatsExchange({data}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/fe-diplom/order");
  };

  return (
    <>
      {
        !data ? 
        <div className="seats__exchange">
          <img className="seats__exchange-img" src={DepartureImage} alt="DepartureImage"/>
          <button className="seats__exchange-button" type="button" onClick={handleClick}>Выбрать другой поезд</button>
        </div> :
        <div className="seats__exchange" style={{justifyContent: "flex-end"}}>
          <img className="seats__exchange-img" src={ArrivalImage} alt="ArrivalImage"/>
          <button className="seats__exchange-button" type="button" onClick={handleClick}>Выбрать другой поезд</button>
        </div>
      }
    </>
  );
}

export default SeatsExchange;

SeatsExchange.propTypes = {
  data: PropTypes.bool.isRequired, 
};
