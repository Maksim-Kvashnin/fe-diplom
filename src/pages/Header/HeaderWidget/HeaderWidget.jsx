import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "#context/appContext";
import SelectLocation from "#components/Select/SelectLocation";
import Calendar from "#components/Calendar/Calendar";
import Modal from "#components/Modal/Modal";
import "./HeaderWidget.css";

function HeaderWidget() {
  const {appState, setAppState} = useContext(AppContext);
  const [newDate, setNewDate] = useState({
    date_start: appState.date_start, 
    date_end: appState.date_end, 
  });
  const [selectValue, setSelectValue] = useState({
    from_city_name: appState.from_city_name, 
    from_city_id: appState.from_city_id, 
    to_city_name: appState.to_city_name, 
    to_city_id: appState.to_city_id, 
  });
  const [loadApp, setLoadApp] = useState(false);
  const [modal, setModal] = useState("none");
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    setLoadApp(true);

    const cityFrom = e.target.parentElement.parentElement.querySelector(".fieldset__input-from .ant-select-selection-item");
    const cityTo = e.target.parentElement.parentElement.querySelector(".fieldset__input-to .ant-select-selection-item");

    if (!cityFrom || !cityTo) {
      setModal("flex");
    } else if ((cityFrom && !cityFrom.title) || (cityTo && !cityTo.title)) {
      setModal("flex");
    } else {
      navigate("/order");
    }
  };

  const getCityChange = (e) => {
    e.preventDefault();
    const cityFrom = e.target.parentElement.parentElement.querySelector(".fieldset__input-from .ant-select-selection-item");
    const cityTo = e.target.parentElement.parentElement.querySelector(".fieldset__input-to .ant-select-selection-item");

    if (!cityFrom || !cityTo) {
      setModal("flex");
    } else if ((cityFrom && !cityFrom.title) || (cityTo && !cityTo.title)) {
      setModal("flex");
    } else if (!selectValue.from_city_name || !selectValue.to_city_name) {
      setModal("flex");
    } else {
      handleSelectValue({
        from_city_name: selectValue.to_city_name, 
        from_city_id: selectValue.to_city_id, 
        to_city_name: selectValue.from_city_name, 
        to_city_id: selectValue.from_city_id, 
      });

      const from = cityFrom.textContent;
      const to = cityTo.textContent;
      cityFrom.textContent = to;
      cityFrom.title = to;
      cityTo.textContent = from;
      cityTo.title = from;
      setLoadApp(true);
    }
  };

  const handleSelectValue = (value) => {
    if (!value) return;
    setSelectValue({
      ...selectValue,
      ...value, 
    });
    setLoadApp(true);
  };

  const handleModal = (value) => setModal(value);

  const changeDate = (value) => {
    if (!value) return;
    setNewDate({
      ...newDate,
      ...value, 
    });
    setLoadApp(true);
  };

  useEffect(() => {
    if (!loadApp) return;
    setAppState({
      ...appState, 
      date_start: newDate.date_start, 
      date_end: newDate.date_end, 
      from_city_name: selectValue.from_city_name, 
      from_city_id: selectValue.from_city_id, 
      to_city_name: selectValue.to_city_name, 
      to_city_id: selectValue.to_city_id,  
    });
    setLoadApp(false);
  },[appState, loadApp, newDate, selectValue, setAppState]);

  return (
    <div className="search-widget">
      <form className="search-widget__form form">

        <fieldset className="form__fieldset fieldset fieldset-direction">
          <legend className="fieldset__legend">Направление</legend>
          <div className="fieldset__input-wrapper">
            <label className="fieldset__label" />
            <SelectLocation name={"fieldset__input-from"} 
              placeholder={appState.from_city_name ? appState.from_city_name : "Откуда"}
              onValue={handleSelectValue}
            />
          </div>
          <div className="fieldset__btn">
            <button className="fieldset-direction__btn" type="button" onClick={getCityChange}/>
          </div>
          <div className="fieldset__input-wrapper">
            <label htmlFor="to" className="fieldset__label" />
            <SelectLocation name={"fieldset__input-to"} 
              placeholder={appState.to_city_name ? appState.to_city_name : "Куда"}
              onValue={handleSelectValue}
            />
          </div>
        </fieldset>

        <fieldset className="form__fieldset fieldset fieldset-date">
          <legend className="fieldset__legend">Дата</legend>
          <div className="fieldset__input-wrapper">
            <label className="fieldset__label" />
            <Calendar name={"fieldset__input-thither"} 
              placeholder={appState.date_start ? appState.date_start : "ДД/ММ/ГГ"}
              onChange={changeDate}
            />
          </div>
          <div className="fieldset__input-wrapper">
            <label className="fieldset__label" />
            <Calendar name={"fieldset__input-back"} 
              placeholder={appState.date_end ? appState.date_end : "ДД/ММ/ГГ"}
              onChange={changeDate}
            />
          </div>
        </fieldset>

        <div className="form__btn">
          <button className="form__btn-send" type="button" onClick={handleClick}>Найти билеты</button>
        </div>
      </form>

      <Modal status={"info"} display={modal} text={`Поля "Откуда" и "Куда" обязательны для заполнения`} onChange={handleModal}/>
    </div>
  );
}

export default HeaderWidget;
