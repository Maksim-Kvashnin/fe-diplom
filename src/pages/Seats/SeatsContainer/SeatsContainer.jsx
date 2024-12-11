import React, { useContext, useState, useEffect } from "react";
import AppContext from "#context/appContext";
import useGetSeats from "#services/useGetSeats";
import SeatsExchange from "../SeatsExchange/SeatsExchange";
import SeatsTrain from "../SeatsTrain/SeatsTrain";
import SeatsTicketAmount from "../SeatsTicketAmount/SeatsTicketAmount";
import SeatsWagonTypes from "../SeatsWagonTypes/SeatsWagonTypes";
import SeatsWagonHeader from "../SeatsWagonHeader/SeatsWagonHeader";
import SeatsWagonDetails from "../SeatsWagonDetails/SeatsWagonDetails";
import SeatsTotalCost from "../SeatsTotalCost/SeatsTotalCost";
import "./SeatsContainer.css";

let depClass;
let arrClass;
function SeatsContainer() {
  const {appState} = useContext(AppContext);
  const {resultDeparture} = useGetSeats(appState, "departure");
  const {resultArrival} = useGetSeats(appState, "arrival");
  const [targetClass, setTargetClass] = useState({});
  const [updateClass, setUpdateClass] = useState(false);

  const handleWagonClass = (value) => {
    if (value.departureClass) depClass = value.departureClass;
    if (value.arrivalClass) arrClass = value.arrivalClass;
    setUpdateClass(true);
  };

  useEffect(() => {
    if (!updateClass) return;
    setTargetClass({...targetClass, depClass, arrClass});
    setUpdateClass(false);
  }, [targetClass, updateClass]);

  return (
    <>
      <div className="seats__container" id={appState && appState.departure_id ? appState.departure_id : null} data-name="departure">
        <SeatsExchange data={false}/>
        <SeatsTrain data={"departure"}/>
        {
          resultDeparture.result.length ?
          <>
            <SeatsTicketAmount />
            <SeatsWagonTypes 
              data={Array.isArray(resultDeparture.result) ? resultDeparture.result : Array.from(resultDeparture.result)} 
              identity={"departure"}
              onChange={handleWagonClass}
            />
            {
              depClass ? 
              <>
                <SeatsWagonHeader 
                  identity={"departure"}
                  wagonClass={targetClass}
                  data={Array.isArray(resultDeparture.result) ? resultDeparture.result : Array.from(resultDeparture.result)} 
                />
                <SeatsWagonDetails 
                  data={Array.isArray(resultDeparture.result) ? resultDeparture.result : Array.from(resultDeparture.result)}
                  identity={"departure"}
                />
                <SeatsTotalCost identity={"departure"}/>
              </> : ""
            }
          </> : <p className="seats__container-error-string">Мест по вашему запросу не обнаружено</p>
        }
      </div>

      {appState && appState.arrival_id ? 
        <div className="seats__container" id={appState.arrival_id} data-name="arrival">
          <SeatsExchange data={true}/>
          <SeatsTrain data={"arrival"}/>
          {
            resultDeparture.result.length ?
            <>
              <SeatsTicketAmount />
              <SeatsWagonTypes 
                data={Array.isArray(resultArrival.result) ? resultArrival.result : Array.from(resultArrival.result)} 
                identity={"arrival"}
                onChange={handleWagonClass}
              />
              {
                arrClass ? 
                <>
                  <SeatsWagonHeader 
                    identity={"arrival"}
                    wagonClass={targetClass}
                    data={Array.isArray(resultArrival.result) ? resultArrival.result : Array.from(resultArrival.result)} 
                  />
                  <SeatsWagonDetails 
                    data={Array.isArray(resultArrival.result) ? resultArrival.result : Array.from(resultArrival.result)}
                    identity={"arrival"}
                  />
                  <SeatsTotalCost identity={"arrival"}/>
                </> : ""
              }
            </> : <p className="seats__container-error-string">Мест по вашему запросу не обнаружено</p>
          }
        </div> : ""
      }
    </>
  );
}

export default SeatsContainer;
