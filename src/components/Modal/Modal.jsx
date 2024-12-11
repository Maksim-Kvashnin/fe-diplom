import React from "react";
import PropTypes from "prop-types";
import "./Modal.css";

function Modal({status, display, onChange, text}) {
  const bgStyle = status === "error" ? {backgroundColor: "#ff3d0061"} : {backgroundColor: "#fff5005c"};

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.closest(".modal__btn")) onChange("none");
  };

  return (
    <div className="modal__wrapper" style={{display: display}} onClick={handleClick}>
      <div className="modal__container">
        <div className={`modal__header modal__header-${status}`} style={bgStyle}></div>
        <div className="modal__content">
          <p className="modal__title">{status === "error" ? "Сообщение об ошибке" : "Информационное сообщение"}</p>
          <p className="modal__text">{text}</p>
        </div>
        <div className="modal__footer">
          <button className="modal__btn" type="button">Понятно</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

Modal.propTypes = {
  status: PropTypes.string.isRequired, 
  display: PropTypes.string.isRequired, 
  onChange: PropTypes.func, 
  text: PropTypes.string.isRequired, 
};
