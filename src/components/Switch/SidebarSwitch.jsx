import React from "react";
import PropTypes from "prop-types";
import { Switch } from "antd";
import "./SidebarSwitch.css";

function SidebarSwitch({name, onChange}) {
  const handleClick = (value) => {
    const obj = {};
    obj[name] = value;
    onChange(obj);
  };


  return (
    <Switch className="switch__btn" data-name={name} onChange={handleClick} />
  );
}

export default SidebarSwitch;

SidebarSwitch.propTypes = {
  name: PropTypes.string.isRequired, 
  onChange: PropTypes.func, 
};
