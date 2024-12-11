import React, {useContext} from "react";
import OrderContext from "#context/orderContext";
import "./SeatsTicketAmount.css";

function SeatsTicketAmount() {
  const {orderState, setOrderState} = useContext(OrderContext);

  const handleInputValue = (e) => {
    e.preventDefault();
    const way = [...e.target.ownerDocument.querySelectorAll(".seats__container")];

    if (e.target.closest(".seats__container").dataset.name === "departure") {
      if (e.target.name === "adult" && !orderState.departure_person_count.child && !orderState.departure_person_count.baby) {
        e.target.value = e.target.value.replace(/[6-9]/g, '').substr(0, 1);
      }
      if (e.target.name === "adult" && +orderState.departure_person_count.baby > e.target.value.replace(/[6-9]/g, '').substr(0, 1)) {
        way[0].querySelector('input[name="baby"]').value = e.target.value.replace(/[6-9]/g, '').substr(0, 1);
      }
      if (e.target.name === "adult" && e.target.value === "0" && +orderState.departure_person_count.child > e.target.value.replace(/[6-9]/g, '').substr(0, 1)) {
        way[0].querySelector('input[name="child"]').value = "0";
      }

      if (e.target.name === "child") {
        e.target.value = e.target.value.replace(/[4-9]/g, '').substr(0, 1);
      }

      if (e.target.name === "baby") {
        if (e.target.value.replace(/[6-9]/g, '').substr(0, 1) > orderState.departure_person_count.adult) {
          e.target.value = orderState.departure_person_count.adult;
        } else {
          e.target.value = e.target.value.replace(/[6-9]/g, '').substr(0, 1);
        }
      }

      setOrderState({
        ...orderState,
        departure_person_count: {
          adult: e.target.name === "adult" ? e.target.value : orderState.departure_person_count.adult,
          child: e.target.name === "child" ? 
                e.target.value : 
                e.target.name === "adult" && e.target.value === "0" && +orderState.departure_person_count.child > e.target.value.replace(/[6-9]/g, '').substr(0, 1) ?
                "0" :
                orderState.departure_person_count.child,
          baby: e.target.name === "baby" ? 
                e.target.value : 
                e.target.name === "adult" && +orderState.departure_person_count.baby > e.target.value.replace(/[6-9]/g, '').substr(0, 1) ? 
                e.target.value.replace(/[6-9]/g, '').substr(0, 1) :
                orderState.departure_person_count.baby,
        },
      });
    } 
    
    if (e.target.closest(".seats__container").dataset.name === "arrival") {
      if (e.target.name === "adult" && !orderState.arrival_person_count.child && !orderState.arrival_person_count.baby) {
        e.target.value = e.target.value.replace(/[6-9]/g, '').substr(0, 1);
      }
      if (e.target.name === "adult" && +orderState.arrival_person_count.baby > e.target.value.replace(/[6-9]/g, '').substr(0, 1)) {
        way[1].querySelector('input[name="baby"]').value = e.target.value.replace(/[6-9]/g, '').substr(0, 1);
      }
      if (e.target.name === "adult" && e.target.value === "0" && +orderState.arrival_person_count.child > e.target.value.replace(/[6-9]/g, '').substr(0, 1)) {
        way[1].querySelector('input[name="child"]').value = "0";
      }

      if (e.target.name === "child") {
        e.target.value = e.target.value.replace(/[4-9]/g, '').substr(0, 1);
      }

      if (e.target.name === "baby") {
        if (e.target.value.replace(/[6-9]/g, '').substr(0, 1) > orderState.arrival_person_count.adult) {
          e.target.value = orderState.arrival_person_count.adult;
        } else {
          e.target.value = e.target.value.replace(/[6-9]/g, '').substr(0, 1);
        }
      }

      setOrderState({
        ...orderState,
        arrival_person_count: {
          adult: e.target.name === "adult" ? e.target.value : orderState.arrival_person_count.adult,
          child: e.target.name === "child" ? 
                e.target.value : 
                e.target.name === "adult" && e.target.value === "0" && +orderState.arrival_person_count.child > e.target.value.replace(/[6-9]/g, '').substr(0, 1) ?
                "0" :
                orderState.arrival_person_count.child,
          baby: e.target.name === "baby" ? 
                e.target.value : 
                e.target.name === "adult" && +orderState.arrival_person_count.baby > e.target.value.replace(/[6-9]/g, '').substr(0, 1) ? 
                e.target.value.replace(/[6-9]/g, '').substr(0, 1) :
                orderState.arrival_person_count.baby,
        },
      });
    }
  };

  return (
    <div className="seats__ticket-amount ticket-amount">
      <p className="ticket-amount__title">Количество билетов</p>
      <form className="ticket-amount__form">
        <div className="ticket-amount__block">
          <label className="ticket-amount__input_label">
            <div className="ticket-amount__input_text">Взрослых — 
            </div>
            <input className="ticket-amount__input" name="adult" min="0" max="5" type="number" placeholder="0" onChange={handleInputValue}/>
          </label>
          <div className="ticket-amount__block_description">Можно добавить 5 пассажиров
          </div>
        </div>

        <div className="ticket-amount__block">
          <label className="ticket-amount__input_label">
            <div className="ticket-amount__input_text">Детских — 
            </div>
            <input className="ticket-amount__input" name="child" min="0" max="3" type="number" placeholder="0" onChange={handleInputValue}/>
          </label>
          <div className="ticket-amount__block_description">Можно добавить 3 детей до 10 лет. Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%
          </div>
        </div>

        <div className="ticket-amount__block">
          <label className="ticket-amount__input_label">
            <div className="ticket-amount__input_text">Детских «без места» — 
            </div>
            <input className="ticket-amount__input" name="baby" min="0" max="5" type="number" placeholder="0" onChange={handleInputValue}/>
          </label>
          <div className="ticket-amount__block_description">
          </div>
        </div>
      </form>
    </div>
  );
}

export default SeatsTicketAmount;
