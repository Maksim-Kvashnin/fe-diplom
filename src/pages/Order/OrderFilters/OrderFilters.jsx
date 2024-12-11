import React, { useContext, useState, useEffect } from "react";
import AppContext from "#context/appContext";
import { switchFilters } from "#utils/switchFilters";
import SVGicon from "#components/SVGicon/SVGicon";
import Calendar from "#components/Calendar/Calendar";
import SidebarSwitch from "#components/Switch/SidebarSwitch";
import SliderPrice from "#components/SliderPrice/SliderPrice";
import SliderPeriod from "#components/SliderPeriod/SliderPeriod";
import ArrivalImage from "#assets/slider-filter-period-arrival.png";
import DepartureImage from "#assets/slider-filter-period-departure.png";
import "./OrderFilters.css";

function OrderFilters() {
  const {appState, setAppState} = useContext(AppContext);
  const [updateApp, setUpdateApp] = useState(false);
  const [newDate, setNewDate] = useState({
    date_start: appState.date_start, 
    date_end: appState.date_end,
  });
  const [newFilter, setNewFilter] = useState({
    have_first_class: appState.have_first_class, 
    have_second_class: appState.have_second_class, 
    have_third_class: appState.have_third_class, 
    have_fourth_class: appState.have_fourth_class, 
    is_express: appState.have_express, 
    have_wifi: appState.have_wifi, 
    price_from: appState.price_from, 
    price_to: appState.price_to, 
    start_departure_hour_from: appState.start_departure_hour_from, 
    start_departure_hour_to: appState.start_departure_hour_to, 
    start_arrival_hour_from: appState.start_arrival_hour_from, 
    start_arrival_hour_to: appState.start_arrival_hour_to, 
    end_departure_hour_from: appState.end_departure_hour_from, 
    end_departure_hour_to: appState.end_departure_hour_to, 
    end_arrival_hour_from: appState.end_arrival_hour_from, 
    end_arrival_hour_to: appState.end_arrival_hour_to, 
  });

  const changeDate = (value) => {
    if (!value) return;
    setNewDate({
      ...newDate, 
      ...value, 
    });
    setUpdateApp(true);
  };

  const handleClickSwitch = (value) => {
    if (!value) return;
    setNewFilter({
      ...newFilter, 
      ...value, 
    });
    setUpdateApp(true);
  };

  const handlePrice = (value) => {
    if (!value) return;
    setNewFilter({
      ...newFilter, 
      ...value, 
    });
    setUpdateApp(true);
  };

  const handleCheckbox = (e) => {
    if (!appState.date_end) {
      e.target.previousElementSibling.disabled = true;
    } else {
      e.target.previousElementSibling.disabled = false;
    }
  };

  const handleTimePeriod = (value) => {
    if (!value) return;
    setNewFilter({
      ...newFilter, 
      ...value, 
    });
    setUpdateApp(true);
  };

  useEffect(() => {
    if (!updateApp) return;
    setAppState({
      ...appState, 
      date_start: newDate.date_start, 
      date_end: newDate.date_end, 
      have_first_class: newFilter.have_first_class, 
      have_second_class: newFilter.have_second_class, 
      have_third_class: newFilter.have_third_class, 
      have_fourth_class: newFilter.have_fourth_class, 
      have_express: newFilter.is_express, 
      have_wifi: newFilter.have_wifi, 
      price_from: newFilter.price_from, 
      price_to: newFilter.price_to, 
      start_departure_hour_from: newFilter.start_departure_hour_from, 
      start_departure_hour_to: newFilter.start_departure_hour_to, 
      start_arrival_hour_from: newFilter.start_arrival_hour_from, 
      start_arrival_hour_to: newFilter.start_arrival_hour_to, 
      end_departure_hour_from: newFilter.end_departure_hour_from, 
      end_departure_hour_to: newFilter.end_departure_hour_to, 
      end_arrival_hour_from: newFilter.end_arrival_hour_from, 
      end_arrival_hour_to: newFilter.end_arrival_hour_to, 
    });
    setUpdateApp(false);
  }, [appState, newDate, newFilter, setAppState, updateApp]);

  return (
    <div className="order-filters filter">

      <div className="filter__date">
        <fieldset className="filter__fieldset">
          <legend className="fieldset__legend">Дата поездки</legend>
          <div className="fieldset__input-wrapper">
            <label className="fieldset__label" />
            <Calendar name={"fieldset__input-thither"} 
              placeholder={appState.date_start ? appState.date_start : "ДД/ММ/ГГ"}
              onChange={changeDate}
            />
          </div>
        </fieldset>
        <fieldset className="filter__fieldset">
          <legend className="fieldset__legend">Дата возвращения</legend>
          <div className="fieldset__input-wrapper">
            <label className="fieldset__label" />
            <Calendar name={"fieldset__input-back"} 
              placeholder={appState.date_end ? appState.date_end : "ДД/ММ/ГГ"}
              onChange={changeDate}
            />
          </div>
        </fieldset>
      </div>

      <div className="filter__switch switch">
        {switchFilters.map(item => {
          return (
            <div className="switch__component" key={item.name}>
              <div className="switch__image">
                <SVGicon name={item.name}/>
              </div>
              <span className="switch__title">{item.alt}</span>
              <SidebarSwitch name={item.name} onChange={handleClickSwitch} />
            </div>
            )
          })
        }
      </div>

      <div className="filter__price price">
        <p className="price__title">Стоимость</p>
        <div className="price__under-range"><p>от</p><p>до</p></div>
        <SliderPrice onChange={handlePrice}/>
      </div>

      <div className="filter__period period-departure">
        <div className="filter__period-control">
          <img className="filter__period-img" src={DepartureImage} alt="DepartureImage"/>
          <p className="filter__period-title">Туда</p>
          <input className="filter__period-btn" id="period-btn-departure" type="checkbox"/>
          <label htmlFor="period-btn-departure"/>
          <div className="filter__period-content">
            <p className="filter__period-subtitle departure-subtitle-left">Время отправления</p>
            <SliderPeriod data={{from: 0, to: 24}} name={"start_departure"} onChange={handleTimePeriod}/>
            <p className="filter__period-subtitle departure-subtitle-right">Время прибытия</p>
            <SliderPeriod data={{from: 0, to: 24}} name={"start_arrival"} onChange={handleTimePeriod}/>
          </div>
        </div>
      </div>

      <div className="filter__period period-arrival">
        <div className="filter__period-control">
          <img className="filter__period-img" src={ArrivalImage} alt="ArrivalImage"/>
          <p className="filter__period-title">Обратно</p>
          <input className="filter__period-btn" id="period-btn-arrival" type="checkbox"/>
          <label htmlFor="period-btn-arrival" onClick={handleCheckbox}/>
          <div className="filter__period-content">
            <p className="filter__period-subtitle arrival-subtitle-left">Время отправления</p>
            <SliderPeriod data={{from: 0, to: 24}} name={"end_departure"} onChange={handleTimePeriod}/>
            <p className="filter__period-subtitle arrival-subtitle-right">Время прибытия</p>
            <SliderPeriod data={{from: 0, to: 24}} name={"end_arrival"} onChange={handleTimePeriod}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderFilters;
