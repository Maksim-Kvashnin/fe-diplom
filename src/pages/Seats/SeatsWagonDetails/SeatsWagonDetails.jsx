import React, {useContext} from "react";
import PropTypes from "prop-types";
import RouteContext from "#context/routeContext";
import SeatsWagonDetailsBody from "./SeatsWagonDetailsBody/SeatsWagonDetailsBody";
import SeatsScheme from "../SeatsScheme/SeatsScheme";
import "./SeatsWagonDetails.css";

function SeatsWagonDetails({data, identity}) {
  const {routeState} = useContext(RouteContext);

  return (
    <>
      {
        identity === "departure" ?
        data.map((item, i) => {
          return (
            <div className="seats__wagon-details wagon-details" id={`wagon-details-departure_${i}`} key={`departure_${i}`}>
              <SeatsWagonDetailsBody 
                data={item} 
                wagonType={routeState.departureClass}
              />
              <SeatsScheme 
                data={item} 
              />
            </div> 
          )
        }) :
        data.map((item, i) => {
          return (
            <div className="seats__wagon-details wagon-details" id={`wagon-details-arrival_${i}`} key={`${i}_arrival`}>
              <SeatsWagonDetailsBody 
                data={item} 
                wagonType={routeState.arrivalClass}
              />
              <SeatsScheme 
                data={item} 
              />
            </div> 
          )
        })
      }
    </>
  );
}

export default SeatsWagonDetails;

SeatsWagonDetails.propTypes = {
  data: PropTypes.array.isRequired, 
  identity: PropTypes.string.isRequired, 
};
