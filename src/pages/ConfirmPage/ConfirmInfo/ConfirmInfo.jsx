import React, {useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "#context/appContext";
import RouteContext from "#context/routeContext";
import OrderContext from "#context/orderContext";
import PayContext from "#context/payContext";
import ConfirmTrain from "../ConfirmTrain/ConfirmTrain";
import SVGicon from "#components/SVGicon/SVGicon";
import Modal from "#components/Modal/Modal";
import "./ConfirmInfo.css";

function ConfirmInfo() {
  const {setAppState} = useContext(AppContext);
  const {setRouteState} = useContext(RouteContext);
  const {orderState} = useContext(OrderContext);
  const {payState} = useContext(PayContext);
  const [check, setCheck] = useState(false);
  const [status, setStatus] = useState("");
  const [modal, setModal] = useState("none");
  const navigate = useNavigate();

  const serviceDepCost = Object.values(orderState.departure_service).reduce((acc, item) => acc + +item, 0);
  const serviceArrCost = Object.values(orderState.arrival_service).reduce((acc, item) => acc + +item, 0);
  const ticketsDepCost = orderState.departure && orderState.departure.seats ? orderState.departure.seats.reduce((acc, item) => acc + +item.seat_cost, 0) : null;
  const ticketsArrCost = orderState.arrival && orderState.arrival.seats ? orderState.arrival.seats.reduce((acc, item) => acc + +item.seat_cost, 0) : null;
  const totalDepCost = Number(serviceDepCost) + Number(ticketsDepCost);
  const totalArrCost = Number(serviceArrCost) + Number(ticketsArrCost);
  const totalDepArrCost = totalDepCost + totalArrCost;
  const concatArray = [...payState.departure.seats, ...payState.arrival.seats];

  const handleModal = (value) => setModal(value);

  const modalInfo = (value) => {
    return value && value === "info" ? 
      <Modal status={"info"} display={modal} text={"Данные о поездке успешно отправлены"} onChange={handleModal}/> : 
      <Modal status={"error"} display={modal} text={"Ошибка! Сервер недоступен. Пожалуйста, попробуйте позже"} onChange={handleModal}/>
  };

  const handleClick = (e) => {
    e.preventDefault();
    setCheck(true);
  };

  useEffect(() => {
    if (!check) return;
    setStatus("");
    fetch("https://students.netoservices.ru/fe-diplom/order", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payState),
    })
      .then(response => response.json())
      .then(data => {
        setStatus("info");
        setModal("flex");
        setTimeout(() => {
          setModal("none");
          setAppState({});
          setRouteState({});
          navigate("/finish");
        }, 1500);
      })
      .catch((e) => {
        setStatus("error");
        setModal("flex");
      });
    setCheck(false);
  }, [check, navigate, payState, setAppState, setRouteState]);

  return (
    <div className="confirm-info__wrapper">

      <div className="confirm-info__block confirm-info__train-block">
        <p className="confirm-info__block-title">Поезд</p>
        <ConfirmTrain/>
      </div>

      <div className="confirm-info__block confirm-info__passengers-block">
        <p className="confirm-info__block-title">Пассажиры</p>
        <div className="confirm-info__passengers-container">
          <div className="confirm-info__passengers-wrapper">

          {
            concatArray.map((item, i) => 
              <div className="confirm-info__passenger" key={i}>
                <div className="confirm-info__passenger-logo">
                  <SVGicon name={"person-in-circle"}/>
                  <p>{item.person_info.is_adult ? "Взрослый" : "Детский"}</p>
                </div>
                <div className="confirm-info__passenger-info">
                  <p>{`${item.person_info.last_name} ${item.person_info.first_name} ${item.person_info.patronymic}`}</p>
                  <p>{item.person_info.gender ? "Пол мужской" : "Пол женский"}</p>
                  <p>{`Дата рождения ${item.person_info.birthday}`}</p>
                  <p>{`${item.person_info.document_type} ${item.person_info.document_data}`}</p>
                </div>
              </div>
            )
          }

          </div>
          <div className="confirm-info__cost-wrapper">
            <div className="confirm-info__total-cost">
              <p>Всего</p>
              <p><span className="confirm-info__cost">{totalDepArrCost}</span>&#8381;</p>
            </div>
            <button className="confirm-info__btn" type="button">Изменить</button>
          </div>
        </div>
      </div>

      <div className="confirm-info__block confirm-info__payment-block">
        <p className="confirm-info__block-title">Способ оплаты</p>
        <div className="confirm-info__payment-wrapper">
          <p className="confirm-info__payment-method">{payState.user.payment_method === "online" ? "Онлайн" : "Наличными"}</p>
          <button className="confirm-info__btn" type="button">Изменить</button>
        </div>
      </div>

      <div className="confirm-info__ok-btn-wrapper">
        <button className="confirm-info__ok-btn" type="button" onClick={handleClick}>подтвердить</button>
      </div>

      {modalInfo(status)}
    </div>
  );
}

export default ConfirmInfo;
