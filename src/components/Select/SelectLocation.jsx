import React, { useState } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import useGetCities from "#services/useGetCities";
import "./SelectLocation.css";

const obj = {};
function SelectLocation({name, placeholder, onValue}) {
  const [input, setInput] = useState('');
  const { result } = useGetCities(input);

  const getID = (array, value) => {
    return array.filter(item => item.name === value)[0]._id;
  };

  const getOptionsArray = (array) => {
    return array.map(item => {
      return {value: item.name.toLowerCase(), label: item.name.toUpperCase()};
    })
  };

  const filterOption = (input, option) => {
    return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  };

  const onChange = (value) => {
    const key = placeholder === "Откуда" ? "from_city" : "to_city";
    obj[`${key}_name`] = value.toUpperCase();
    obj[`${key}_id`] = getID(result, value);
    onValue(obj);
  };

  const onSearch = (value) => setInput(value.toUpperCase());

  return (
    <Select 
      showSearch 
      allowClear={false}
      className={`fieldset__input ${name}`} 
      placeholder={placeholder} 
      optionFilterProp="children" 
      filterOption={filterOption} 
      onChange={onChange} 
      onSearch={onSearch} 
      options={getOptionsArray(Array.from(result))} 
      required 
    />
  );
}

export default SelectLocation;

SelectLocation.propTypes = {
  name: PropTypes.string.isRequired, 
  placeholder: PropTypes.string.isRequired,  
  onValue: PropTypes.func, 
};
