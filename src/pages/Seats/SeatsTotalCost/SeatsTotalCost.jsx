import React, {useContext} from "react";
import PropTypes from "prop-types";
import OrderContext from "#context/orderContext";
import "./SeatsTotalCost.css";

function SeatsTotalCost({identity}) {
  const {orderState} = useContext(OrderContext);

  const depSeatsArray = orderState.departure.seats && orderState.departure.seats.length ? orderState.departure.seats : [];
  const arrSeatsArray = orderState.arrival.seats && orderState.arrival.seats.length ? orderState.arrival.seats : [];

  const maxSeatsDepCount = Number(orderState.departure_person_count.adult) + Number(orderState.departure_person_count.child);
  const maxSeatsArrCount = Number(orderState.arrival_person_count.adult) + Number(orderState.arrival_person_count.child);

  const serviceDepCost = Object.values(orderState.departure_service).reduce((acc, item) => acc + +item, 0);
  const serviceArrCost = Object.values(orderState.arrival_service).reduce((acc, item) => acc + +item, 0);

  const ticketsDepCost = orderState.departure && orderState.departure.seats ? orderState.departure.seats.reduce((acc, item) => acc + +item.seat_cost, 0) : null;
  const ticketsArrCost = orderState.arrival && orderState.arrival.seats ? orderState.arrival.seats.reduce((acc, item) => acc + +item.seat_cost, 0) : null;

  const totalDepCost = Number(serviceDepCost) + Number(ticketsDepCost);
  const totalArrCost = Number(serviceArrCost) + Number(ticketsArrCost);

  return (
    <>
      {
        identity === "departure" ?
        <>
          {
            (depSeatsArray.length && (depSeatsArray.length === maxSeatsDepCount)) ?
            <p className="seats__total-cost-text-info">Лимит билетов достигнут</p> : 
            (depSeatsArray.length && (depSeatsArray.length > maxSeatsDepCount)) ?
            <p className="seats__total-cost-text-error">Лимит билетов превышен</p> : ""
          }
          <div className="seats__total-cost">
            <span className="seats__total-cost-count">{totalDepCost}</span>
            <span>&#8381;</span>
          </div>
        </> :
        <>
          {
            (arrSeatsArray.length && (arrSeatsArray.length === maxSeatsArrCount)) ?
            <p className="seats__total-cost-text-info">Лимит билетов достигнут</p> : 
            (arrSeatsArray.length && (arrSeatsArray.length > maxSeatsArrCount)) ?
            <p className="seats__total-cost-text-error">Лимит билетов превышен</p> : ""
          }
          <div className="seats__total-cost">
            <span className="seats__total-cost-count">{totalArrCost}</span>
            <span>&#8381;</span>
          </div>
        </>
      }
    </>
  );
}

export default SeatsTotalCost;

SeatsTotalCost.propTypes = {
  identity: PropTypes.string.isRequired, 
};
