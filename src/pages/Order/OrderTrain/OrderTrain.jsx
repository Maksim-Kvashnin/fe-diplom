import React, { useContext } from "react";
import PropTypes from "prop-types";
import AppContext from "#context/appContext";
import RouteContext from "#context/routeContext";
import OrderContext from "#context/orderContext";
import { useNavigate } from "react-router-dom";
import SVGicon from "#components/SVGicon/SVGicon";
import getTime from '#services/getTime';
import "./OrderTrain.css";

function OrderTrain({ item }) {
  const {appState, setAppState} = useContext(AppContext);
  const {routeState, setRouteState} = useContext(RouteContext);
  const {orderState, setOrderState} = useContext(OrderContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const departureId = e.target.parentElement.parentElement.querySelector(".train__time-to");
    const arrivalId = e.target.parentElement.parentElement.querySelector(".train__time-from");
    setAppState({
      ...appState, 
      departure_id: departureId && departureId.id ? departureId.id : null, 
      arrival_id: arrivalId && arrivalId.id ? arrivalId.id : null, 
    });

    setRouteState({
      ...routeState,
      departure_id: item.departure._id || null,
      departure_train_name: item.departure.train.name || null,
      departure_from_city_name: item.departure.from.city.name || null,
      departure_to_city_name: item.departure.to.city.name || null,
      departure_from_datetime: getTime(item.departure.from.datetime) || null,
      departure_from_railway_station_name: item.departure.from.railway_station_name || null,
      departure_to_datetime: getTime(item.departure.to.datetime) || null,
      departure_to_railway_station_name: item.departure.to.railway_station_name || null,
      departure_duration: getTime(item.departure.duration) || null,
      
      arrival_id: item && item.arrival ? item.arrival._id : null,
      arrival_train_name: item && item.arrival ? item.arrival.train.name : null,
      arrival_from_city_name: item && item.arrival ? item.arrival.from.city.name : null,
      arrival_to_city_name: item && item.arrival ? item.arrival.to.city.name : null,
      arrival_from_datetime: item && item.arrival ? getTime(item.arrival.from.datetime) : null,
      arrival_from_railway_station_name: item && item.arrival ? item.arrival.from.railway_station_name : null,
      arrival_to_datetime: item && item.arrival ? getTime(item.arrival.to.datetime) : null,
      arrival_to_railway_station_name: item && item.arrival ? item.arrival.to.railway_station_name : null,
      arrival_duration: item && item.arrival ? getTime(item.arrival.duration) : null,
    });

    setOrderState({
      ...orderState,
      departure: {route_direction_id: departureId && departureId.id ? departureId.id : null},
      arrival: {route_direction_id: arrivalId && arrivalId.id ? arrivalId.id : null},
    });

    navigate("/fe-diplom/order/seats");
  };

  const openSeats = (e) => {
    e.preventDefault();
    if (e.target.nextElementSibling.className.includes("train__price-seat-up-down")) {
      e.target.nextElementSibling.classList.toggle("train__price-seat-up-down-open");
    }
  };

  return (
    <div className="order-train train">

      <div className="train__name-wrapper" style={item && item.arrival ? {height: "360px"} : {height: "350px"}}>
        <div className="train__name-icon">
          <SVGicon name={"train"}/>
        </div>
        <p className="train__name-number">{item.departure.train.name}</p>
        <div className="train__name-place">
          {/* <p className="train__name-city">Адлер</p> */}
          <p className="train__name-city">{item.departure.from.city.name}</p>
          <p className="train__name-city">{item.departure.to.city.name}</p> 
        </div>
        {item && item.arrival ? 
        <>
          <p className="train__name-number">{item.arrival.train.name}</p>
          <div className="train__name-place">
            {/* <p className="train__name-city">Адлер</p> */}
            <p className="train__name-city">{item.arrival.from.city.name}</p>
            <p className="train__name-city">{item.arrival.to.city.name}</p> 
          </div>
        </> : ""
        }
      </div>

      <div className="train__time-wrapper" style={item && item.arrival ? {height: "360px"} : {height: "350px"}}>
        <div className="train__time-to" id={item.departure._id}>
          <div>
            <time dateTime="2001-05-15 19:00">{getTime(item.departure.from.datetime)}</time>
            <p>{item.departure.from.city.name}</p>
            <p>{item.departure.from.railway_station_name}</p>
          </div>
          <div>
            <p>{getTime(item.departure.duration)}</p>
            <div className="train__time-arrow arrow-right"></div>
          </div>
          <div>
            <time dateTime="2024-05-15 19:00">{getTime(item.departure.to.datetime)}</time>
            <p>{item.departure.to.city.name}</p>
            <p>{item.departure.to.railway_station_name}</p>
          </div>
        </div>
        {item && item.arrival ? 
        <div className="train__time-from" id={item.arrival._id}>
          <div>
            <time dateTime="2001-05-15 19:00">{getTime(item.arrival.from.datetime)}</time>
            <p>{item.arrival.from.city.name}</p>
            <p>{item.arrival.from.railway_station_name}</p>
          </div>
          <div>
            <p>{getTime(item.arrival.duration)}</p>
            <div className="train__time-arrow arrow-left"></div>
          </div>
          <div>
            <time dateTime="2024-05-15 19:00">{getTime(item.arrival.to.datetime)}</time>
            <p>{item.arrival.to.city.name}</p>
            <p>{item.arrival.to.railway_station_name}</p>
          </div>
        </div> : ""
        }
      </div>

      <div className="train__price-wrapper" style={item && item.arrival ? {height: "360px"} : {height: "350px"}}>
        <div className="train__price-seats">

          {item.departure.available_seats_info && item.departure.available_seats_info.fourth ? 
            <div className="train__price-seat">
              <p className="train__price-seat-type">Сидячий</p>
              <p className="train__price-seat-count" onClick={openSeats}>{item.departure.available_seats_info.fourth}</p>

              <div className="train__price-seat-up-down">
                <div className="train__price-seat-up">
                  <p className="train__price-seat-up-type">верхние</p>
                  {/* <p className="train__price-seat-up-count">19</p> */}
                  <p>
                    <span className="train__price-seat-up-sum">{item.departure.price_info.fourth.top_price}</span>
                    <span className="train__price-seat-up-currency">&#8381;</span>
                  </p>
                </div>
                <div className="train__price-seat-down">
                  <p className="train__price-seat-down-type">нижние</p>
                  {/* <p className="train__price-seat-down-count">5</p> */}
                  <p>
                    <span className="train__price-seat-down-sum">{item.departure.price_info.fourth.bottom_price}</span>
                    <span className="train__price-seat-down-currency">&#8381;</span>
                  </p>
                </div>
              </div>

              <p>от
                <span className="train__price-seat-sum">{item.departure.price_info.fourth.top_price}</span>
                <span className="train__price-seat-currency">&#8381;</span>
              </p>
            </div> : ""
          }

          {item.departure.available_seats_info && item.departure.available_seats_info.third ? 
            <div className="train__price-seat">
              <p className="train__price-seat-type">Плацкарт</p>
              <p className="train__price-seat-count" onClick={openSeats}>{item.departure.available_seats_info.third}</p>

              <div className="train__price-seat-up-down">
                <div className="train__price-seat-up">
                  <p className="train__price-seat-up-type">верхние</p>
                  {/* <p className="train__price-seat-up-count">19</p> */}
                  <p>
                    <span className="train__price-seat-up-sum">{item.departure.price_info.third.top_price}</span>
                    <span className="train__price-seat-up-currency">&#8381;</span>
                  </p>
                </div>
                <div className="train__price-seat-down">
                  <p className="train__price-seat-down-type">нижние</p>
                  {/* <p className="train__price-seat-down-count">5</p> */}
                  <p>
                    <span className="train__price-seat-down-sum">{item.departure.price_info.third.bottom_price}</span>
                    <span className="train__price-seat-down-currency">&#8381;</span>
                  </p>
                </div>
                <div className="train__price-seat-down">
                  <p className="train__price-seat-down-type">боковые</p>
                  {/* <p className="train__price-seat-down-count">5</p> */}
                  <p>
                    <span className="train__price-seat-down-sum">{item.departure.price_info.third.side_price}</span>
                    <span className="train__price-seat-down-currency">&#8381;</span>
                  </p>
                </div>
              </div>

              <p>от
                <span className="train__price-seat-sum">{item.departure.price_info.third.top_price}</span>
                <span className="train__price-seat-currency">&#8381;</span>
              </p>
            </div> : ""
          }

          {item.departure.available_seats_info && item.departure.available_seats_info.second ? 
            <div className="train__price-seat">
              <p className="train__price-seat-type">Купе</p>
              <p className="train__price-seat-count" onClick={openSeats}>{item.departure.available_seats_info.second}</p>

              <div className="train__price-seat-up-down">
                <div className="train__price-seat-up">
                  <p className="train__price-seat-up-type">верхние</p>
                  {/* <p className="train__price-seat-up-count">19</p> */}
                  <p>
                    <span className="train__price-seat-up-sum">{item.departure.price_info.second.top_price}</span>
                    <span className="train__price-seat-up-currency">&#8381;</span>
                  </p>
                </div>
                <div className="train__price-seat-down">
                  <p className="train__price-seat-down-type">нижние</p>
                  {/* <p className="train__price-seat-down-count">5</p> */}
                  <p>
                    <span className="train__price-seat-down-sum">{item.departure.price_info.second.bottom_price}</span>
                    <span className="train__price-seat-down-currency">&#8381;</span>
                  </p>
                </div>
              </div>

              <p>от
                <span className="train__price-seat-sum">{item.departure.price_info.second.top_price}</span>
                <span className="train__price-seat-currency">&#8381;</span>
              </p>
            </div> : ""
          }

          {item.departure.available_seats_info && item.departure.available_seats_info.first ? 
            <div className="train__price-seat">
              <p className="train__price-seat-type">Люкс</p>
              <p className="train__price-seat-count" onClick={openSeats}>{item.departure.available_seats_info.first}</p>

              <div className="train__price-seat-up-down">
                <div className="train__price-seat-down">
                  <p className="train__price-seat-down-type">нижние</p>
                  {/* <p className="train__price-seat-down-count">5</p> */}
                  <p>
                    <span className="train__price-seat-down-sum">{item.departure.price_info.first.price}</span>
                    <span className="train__price-seat-down-currency">&#8381;</span>
                  </p>
                </div>
              </div>

              <p>от
                <span className="train__price-seat-sum">{item.departure.price_info.first.price}</span>
                <span className="train__price-seat-currency">&#8381;</span>
              </p>
            </div> : ""
          }
        </div>

        <div className="train__price-icons">
          {item.departure.have_air_conditioning ? <SVGicon name={"have_air_conditioning"}/> : ""}
          {item.departure.have_wifi ? <SVGicon name={"have_wifi"}/> : ""}
          {item.departure.is_express ? <SVGicon name={"is_express"}/> : ""}
        </div>
        <button className="train__price-button" type="button" onClick={handleClick}>Выбрать места</button>
      </div>
    </div>
  );
}

export default OrderTrain;

OrderTrain.propTypes = {
  item: PropTypes.object,
};
