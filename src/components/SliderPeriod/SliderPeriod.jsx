import React from "react";
import PropTypes from "prop-types";
import { Slider } from "antd";
import "./SliderPeriod.css";

function SliderPeriod({data, name, onChange}) {
  const marks = {
    0: "0:00",
    24: "24:00",
  }

  const formatter = (value) => `${value}:00`;

  const onChangeComplete = (value) => {
    const obj = {};
    obj[`${name}_hour_from`] = value[0];
    obj[`${name}_hour_to`] = value[1];
    onChange(obj);
  };

  return (
    <Slider
      range={{draggableTrack: false}}
      tooltip={{open: true, formatter}}
      defaultValue={[data.from, data.to]}
      step={1}
      min={0}
      max={24}
      marks={marks}
      onChangeComplete={onChangeComplete}
    />
  );
}

export default SliderPeriod;

SliderPeriod.propTypes = {
  data: PropTypes.object.isRequired, 
  name: PropTypes.string.isRequired, 
  onChange: PropTypes.func, 
};
