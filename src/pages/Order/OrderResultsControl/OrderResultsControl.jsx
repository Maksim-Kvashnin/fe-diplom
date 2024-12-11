import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppContext from "#context/appContext";
import "./OrderResultsControl.css";

function OrderResultsControl({count, onChange}) {
  const {appState, setAppState} = useContext(AppContext);
  const [option, setOption] = useState({dataValue: "date", value: "времени"});
  const [view, setView] = useState({dataValue: "5", value: "5"});
  const [update, setUpdate] = useState(false);

  const handleOptions = (e) => {
    e.preventDefault();
    e.target.parentElement.classList.toggle("result-control__options-visible");
    onChange(e.target.dataset.value);
    setOption({dataValue: e.target.dataset.value, value: e.target.value});
    setUpdate(true);
  };

  const handleOpenList = (e) => {
    e.preventDefault();
    e.target.nextElementSibling.classList.toggle("result-control__options-visible");
  };

  const handleViewQuantity = (e) => {
    e.preventDefault();
    if (e.target.closest(".view-button")) {
      [...e.target.parentElement.children].map(item => item.className = "view-button")
      e.target.classList.add("view-button_active");
      setView({dataValue: e.target.dataset.value, value: e.target.textContent});
      setUpdate(true);
    }
  };

  useEffect(() => {
    if (!update) return;
    setAppState({
      ...appState, 
      sort: option.dataValue || "date", 
      limit: view.value || "5", 
    });
    setUpdate(false);
  },[appState, option, setAppState, update, view]);

  return (
    <div className="order-results__control result-control">

      <p>найдено:&nbsp;&nbsp;
        <span className="result-control__find-value">{count}</span>
      </p>

      <div className="result-control__sort">
        <p>сортировать по:&nbsp;&nbsp;</p>
        <div className="result-control__select">
          <input 
            className="result-control__select-btn" 
            type="button" 
            data-value={option.dataValue} 
            value={option.value} 
            onClick={handleOpenList}/>
          <div className="result-control__options">
            <input 
              className="result-control__option" 
              type="button" 
              data-value={"date"} 
              value="времени" 
              onClick={handleOptions}/>
            <input 
              className="result-control__option" 
              type="button" 
              data-value={"price"} 
              value="стоимости" 
              onClick={handleOptions}/>
            <input 
              className="result-control__option" 
              type="button" 
              data-value={"duration"} 
              value="длительности" 
              onClick={handleOptions}/>
          </div>
        </div>
      </div>

      <div className="result-control__view">
        <p>показывать по:&nbsp;&nbsp;</p>
        <div className="result-control__view-wrapper" onClick={handleViewQuantity}>
          <button className="view-button view-button_active" type="button" data-value={"5"}>5</button>
          <button className="view-button" type="button" data-value={"10"}>10</button>
          <button className="view-button" type="button" data-value={"20"}>20</button>
        </div>
      </div>

    </div>
  );
}

export default OrderResultsControl;

OrderResultsControl.propTypes = {
  count: PropTypes.number.isRequired, 
  onChange: PropTypes.func, 
};
