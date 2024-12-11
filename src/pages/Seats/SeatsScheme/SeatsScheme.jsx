import React, {useContext} from "react";
import PropTypes from "prop-types";
import OrderContext from "#context/orderContext";
import WagonHeader from "#assets/wagon-header.png";
import WagonFooter from "#assets/wagon-footer.png";
import SeatsSchemeFourthClass from "./SeatsSchemeFourthClass/SeatsSchemeFourthClass";
import SeatsSchemeThirdClass from "./SeatsSchemeThirdClass/SeatsSchemeThirdClass";
import SeatsSchemeSecondClass from "./SeatsSchemeSecondClass/SeatsSchemeSecondClass";
import SeatsSchemeFirstClass from "./SeatsSchemeFirstClass/SeatsSchemeFirstClass";
import "./SeatsScheme.css";

function SeatsScheme({data}) {
  const {orderState, setOrderState} = useContext(OrderContext);

  const handleSeats = (value) => {
    const depSeatsArray = orderState.departure.seats && orderState.departure.seats.length ? orderState.departure.seats : [];
    const arrSeatsArray = orderState.arrival.seats && orderState.arrival.seats.length ? orderState.arrival.seats : [];

    if (value.way === "departure") {
      const targetWagon = data.coach._id === value.coach_id ? data : false;
      let targetTicketCost;

      if (targetWagon.coach.class_type === "first") {
        targetTicketCost = targetWagon.coach.price;
      } else if (targetWagon.coach.class_type === "third") {
        targetTicketCost = +value.seatIndex > 32 ? targetWagon.coach.side_price : +value.seatIndex % 2 === 0 ? targetWagon.coach.top_price : targetWagon.coach.bottom_price;
      } else {
        targetTicketCost = +value.seatIndex % 2 === 0 ? targetWagon.coach.top_price : targetWagon.coach.bottom_price;
      }

      depSeatsArray.push({
        coach_id: value.coach_id, 
        seat_number: value.seatIndex,
        seat_cost: targetTicketCost,
        selected: value.selected,
      });

      const delEl = depSeatsArray.find(item => item.seat_number === value.seatIndex && !value.selected);
      const newArr = delEl ? depSeatsArray.filter(item => item.seat_number !== value.seatIndex) : depSeatsArray;

      setOrderState({
        ...orderState,
        departure: {
          ...orderState.departure,
          seats: newArr,
        },
      });

    } else {
      const targetWagon = data.coach._id === value.coach_id ? data : false;
      let targetTicketCost;

      if (targetWagon.coach.class_type === "first") {
        targetTicketCost = targetWagon.coach.price;
      } else if (targetWagon.coach.class_type === "third") {
        targetTicketCost = +value.seatIndex > 32 ? targetWagon.coach.side_price : +value.seatIndex % 2 === 0 ? targetWagon.coach.top_price : targetWagon.coach.bottom_price;
      } else {
        targetTicketCost = +value.seatIndex % 2 === 0 ? targetWagon.coach.top_price : targetWagon.coach.bottom_price;
      }

      arrSeatsArray.push({
        coach_id: value.coach_id, 
        seat_number: value.seatIndex,
        seat_cost: targetTicketCost,
        selected: value.selected,
      });

      const delEl = arrSeatsArray.find(item => item.seat_number === value.seatIndex && !value.selected);
      const newArr = delEl ? arrSeatsArray.filter(item => item.seat_number !== value.seatIndex) : arrSeatsArray;

      setOrderState({
        ...orderState,
        arrival: {
          ...orderState.arrival,
          seats: newArr,
        },
      });
    }
  };

  return (
    <div className="seats__scheme scheme">
      <p className="scheme__wagon-number">{data.coach.name}</p>
      <div className="scheme__container">
        <img className="scheme__wagon-img" src={WagonHeader} alt="Wagon"/>
        <div className="scheme__seats-wrapper">
        {
          data.coach.class_type === "fourth" ? <SeatsSchemeFourthClass seats={data.seats} onChange={handleSeats}/> : 
          data.coach.class_type === "third" ? <SeatsSchemeThirdClass seats={data.seats} onChange={handleSeats}/> : 
          data.coach.class_type === "second" ? <SeatsSchemeSecondClass seats={data.seats} onChange={handleSeats}/> : 
          data.coach.class_type === "first" ? <SeatsSchemeFirstClass seats={data.seats} onChange={handleSeats}/> : 
          ""
        }
        </div>
        <img className="scheme__wagon-img" src={WagonFooter} alt="Wagon"/>
      </div>
    </div>
  );
}

export default SeatsScheme;

SeatsScheme.propTypes = {
  data: PropTypes.object, 
};
