import React from "react";
import PropTypes from "prop-types";
import { Slider } from "antd";
import "./SliderPrice.css";

function SliderPrice({onChange}) {
  const marks = {
    0: "0",
    9999: "9999",
  }

  const onChangeComplete = (value) => {
    const obj = {};
    obj["price_from"] = value[0];
    obj["price_to"] = value[1];
    onChange(obj);
  };

  return (
    <Slider
      range={{draggableTrack: false}}
      tooltip={{open: true}}
      defaultValue={[0, 9999]}
      step={10}
      min={0}
      max={9999}
      marks={marks}
      onChangeComplete={onChangeComplete}
    />
  );
}

export default SliderPrice;

SliderPrice.propTypes = {
  onChange: PropTypes.func, 
};
