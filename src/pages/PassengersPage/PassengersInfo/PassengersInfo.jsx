import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import OrderContext from "#context/orderContext";
import PassengersInfoBlock from "../PassengersInfoBlock/PassengersInfoBlock";
import PassengersAddInfoBlock from "../PassengersAddInfoBlock/PassengersAddInfoBlock";
import "./PassengersInfo.css";

function PassengersInfo() {
  const {orderState} = useContext(OrderContext);
  const adultSeatsCount = +orderState.departure_person_count.adult + +orderState.arrival_person_count.adult;
  const childSeatsCount = +orderState.departure_person_count.child + +orderState.arrival_person_count.child;
  const passengersCount = adultSeatsCount + childSeatsCount;

  const [count, setCount] = useState(passengersCount);
  const navigate = useNavigate();

  const handleChange = () => {
    setCount(count + 1);
  };

  const handleDelete = () => {
    setCount(count - 1);
  }

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/order/payment");
  };

  return (
    <div className="passengers-info__wrapper">
      <div className="passengers-info__container">
        {
          [...Array(count)].map((_, i) => {
            return (
              <PassengersInfoBlock number={i+1} key={i} onChange={handleDelete}/>
          )})
        }

        <PassengersAddInfoBlock onChange={handleChange}/>
      </div>
      
      <button className="passengers-info__btn" type="button" onClick={handleClick}>Далее</button>
    </div>
  );
}

export default PassengersInfo;
