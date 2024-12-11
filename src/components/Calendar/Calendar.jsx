import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import "./Calendar.css";

const obj = {};
function Calendar({name, placeholder, onChange}) {
  let $input = useRef();
  let element = useRef();

  useEffect(() => {
    element.current = new AirDatepicker($input.current, {
      dateFormat(date) {
        const newDate = date.toLocaleString("ru-RU", {
          year:"numeric", 
          month:"numeric", 
          day:"numeric",
        });
        return `${newDate.slice(6)}-${newDate.slice(3, 5)}-${newDate.slice(0, 2)}`;
      },
      navTitles: {
        days: "MMMM",
      },
      onSelect({date}) {
        const newDate = date.toLocaleString("ru-RU", {year:"numeric", month:"numeric", day:"numeric"});
        const updateDate = `${newDate.slice(6)}-${newDate.slice(3, 5)}-${newDate.slice(0, 2)}`;
        obj[name] = updateDate;
        onChange({date_start: obj["fieldset__input-thither"], date_end: obj["fieldset__input-back"]});
      }
    });
  }, [name, onChange]);

  useEffect(() => {
    element.current.update({});
  }, []);

  return (
    <input 
      ref={$input} 
      placeholder={placeholder} 
      className={`fieldset__input ${name}`} 
      required 
    />
  );
}

export default Calendar;

Calendar.propTypes = {
  name: PropTypes.string.isRequired, 
  placeholder: PropTypes.string.isRequired, 
  onChange: PropTypes.func.isRequired, 
};
