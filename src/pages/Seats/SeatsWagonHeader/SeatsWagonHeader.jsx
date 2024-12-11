import React, {useContext} from "react";
import PropTypes from "prop-types";
import RouteContext from "#context/routeContext";
import "./SeatsWagonHeader.css";

function SeatsWagonHeader({data, identity, wagonClass}) {
  const {routeState, setRouteState} = useContext(RouteContext);

  const handleClick = (e) => {
    e.preventDefault();
    const way = [...e.target.ownerDocument.querySelectorAll(".seats__container")];

    if (identity === "departure") {
      const wagonsDeparture = [...way[0].querySelectorAll(".seats__wagon-details")];
      wagonsDeparture.forEach(item => item.style.display = "none");
      wagonsDeparture.forEach(item => {
        if (item.children[0].children[0].textContent === e.target.textContent) {
          item.style.display = "flex";
        }
      });
    } else {
      const wagonsArrival = [...way[1].querySelectorAll(".seats__wagon-details")];
      wagonsArrival.forEach(item => item.style.display = "none");
      wagonsArrival.forEach(item => {
        if (item.children[0].children[0].textContent === e.target.textContent) {
          item.style.display = "flex";
        }
      });
    }

    const classElements = e.target.ownerDocument.querySelector(`[id="wagon-names-${identity}"] .wagon-details__list`).children;
    [...classElements].forEach(item => item.style.color = "#000000");
    e.target.style.color = "#FFFFFF";
    setRouteState({
      ...routeState,
      [`${identity}Id`]: e.target.id,
    });
  };

  return (
    <div className="seats__wagon-details-header" id={`wagon-names-${identity}`}>
      <p>Вагоны</p>
      <div className="wagon-details__list">
      {
        data.map(item => identity === "departure" && item.coach.class_type === wagonClass.depClass ? 
          <button 
            className="wagon-details__item"
            type="button" 
            key={item.coach._id}
            id={item.coach._id}
            onClick={handleClick}
            >
              {item.coach.name}
          </button> : ""
        ) 
      }
      {
        data.map(item => identity === "arrival" && item.coach.class_type === wagonClass.arrClass ? 
          <button 
            className="wagon-details__item"
            type="button" 
            key={item.coach._id}
            id={item.coach._id}
            onClick={handleClick}
            >
              {item.coach.name}
          </button> : ""
        )
      }
      </div>
      <p>Нумерация вагонов начинается с головы поезда</p>
    </div>
  );
}

export default SeatsWagonHeader;

SeatsWagonHeader.propTypes = {
  data: PropTypes.array.isRequired, 
  identity: PropTypes.string.isRequired, 
  wagonClass: PropTypes.object.isRequired, 
};
