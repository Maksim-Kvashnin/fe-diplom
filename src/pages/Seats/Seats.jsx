import React, { useContext, useState, useEffect } from "react";
import AppContext from "#context/appContext";
import OrderContext from "#context/orderContext";
import useGetSeats from "#services/useGetSeats";
import { useNavigate } from "react-router-dom";
import SeatsContainer from "../Seats/SeatsContainer/SeatsContainer";
import Modal from "#components/Modal/Modal";
import "./Seats.css";

function Seats() {
  const {appState} = useContext(AppContext);
  const {orderState} = useContext(OrderContext);
  const {resultDeparture} = useGetSeats(appState, "departure");
  const {resultArrival} = useGetSeats(appState, "arrival");
  const [modal, setModal] = useState("none");
  const [close, setClose] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/fe-diplom/order/passengers");
  };

  const handleModal = (value) => {
    setModal(value);
  };

  const setDisabled = () => {
    let bool;
    if (orderState.departure.route_direction_id && !orderState.arrival.route_direction_id) {
      bool = !(orderState.departure.seats && orderState.departure.seats.length);
    } else {
      bool = !(orderState.departure.seats && orderState.departure.seats.length) || !(orderState.arrival.seats && orderState.arrival.seats.length);
    }
    return bool;
  };

  useEffect(() => {
    if (close) return;
    if (!resultDeparture.isLoading && !resultArrival.isLoading) {
      if (appState.departure_id && !appState.arrival_id && resultDeparture.result.length) setModal("none");
      if (appState.departure_id && appState.arrival_id && resultDeparture.result.length) setModal("none");
      if (appState.departure_id && appState.arrival_id && !resultDeparture.result.length) setModal("flex");
      if (appState.departure_id && !resultDeparture.result.length) setModal("flex");
    }
    setClose(true);
  }, [appState, close, resultArrival, resultDeparture]);


  return (
    <div>
      <p className="seats-title">Выбор мест</p>
      <SeatsContainer />
      <button className="seats-button" type="button" onClick={handleClick} disabled={setDisabled()}>далее</button>
      <Modal status={"error"} display={modal} text={resultArrival && resultArrival.result.error ? resultArrival.result.error : ""} onChange={handleModal}/>
    </div>
  );
}

export default Seats;
