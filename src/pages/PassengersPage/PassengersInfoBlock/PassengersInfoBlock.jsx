import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import OrderContext from "#context/orderContext";
import PayContext from "#context/payContext";
import "./PassengersInfoBlock.css";

function PassengersInfoBlock({ number, onChange }) {
  const {payState, setPayState} = useContext(PayContext);
  const {orderState} = useContext(OrderContext);

  const depAdultCount = +orderState.departure_person_count.adult;
  const depChildCount = +orderState.departure_person_count.child;
  const depAdultChildCount = depAdultCount + depChildCount;

  const [showComponent, setShowComponent] = useState(true);
  const [age, setAge] = useState({dataValue: "adult", value: "взрослый"});
  const [document, setDocument] = useState({dataValue: "passport", value: "Паспорт"});

  const handleAge = (e) => {
    e.preventDefault();
    setAge({dataValue: e.target.dataValue, value: e.target.value});
    e.target.parentElement.classList.toggle("info-block__select-options-visible");
  };

  const handleDocument = (e) => {
    e.preventDefault();
    setDocument({dataValue: e.target.dataValue, value: e.target.value});
    e.target.parentElement.classList.toggle("info-block__select-options-visible");
  };

  const handleOpenList = (e) => {
    e.preventDefault();
    e.target.nextElementSibling.classList.toggle("info-block__select-options-visible");
  };

  const handleChangeDocument = (e) => {
    e.preventDefault();
    const target = e.target.closest(".passengers__select-option");
    const passportBlock = e.target.closest(".info-block__identity").children[1];
    const birthBlock = e.target.closest(".info-block__identity").children[2];
    if (target) {
      if (target.value === "Свидетельство о рождении") {
        passportBlock.classList.add("invisible-block");
        birthBlock.classList.remove("invisible-block");
      } else {
        passportBlock.classList.remove("invisible-block");
        birthBlock.classList.add("invisible-block");
      }
    }
  }

  const checkFIO = (e) => {
    e.preventDefault();
    e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-Я]/gi, '');
  };

  const checkPassportSeries = (e) => {
    e.preventDefault();
    e.target.value = e.target.value.replace(/[0-9]{5}/g, '');
  };

  const checkPassportNumber = (e) => {
    e.preventDefault();
    e.target.value = e.target.value.replace(/[0-9]{7}/g, '');
  };

  const checkBirthNumber = (e) => {
    e.preventDefault();
    const regex = /^M{0,3}(D?C{0,3}|C[DM])(L?X{0,3}|X[LC])(V?I{0,3}|I[VX])\b[-][А-Я]{2}[-][0-6]{6}$/;
    const str = e.target.value;
    const result = regex.test(str);
    if (e.target.value && !result) {
      e.target.style.borderColor = "red"
      getError(e, "Номер свидетельства о рождении указан некорректно. Пример: VIII-ЫП-123456");
    } else {
      e.target.style.borderColor = ""
    }
  };

  const handleDeleteBlock = (e) => {
    e.preventDefault();
    if (e.target) onChange(true);
    // setShowComponent(false);
    setShowComponent(true);
  };

  const getError = (e, text) => {
    const errorBlock = e.target.closest(`.passenger-${number}`).querySelector(".info-block__next-incorrect");
    errorBlock.className = "info-block__next-incorrect";
    errorBlock.children[1].textContent = text;
    setTimeout(() => {
      errorBlock.className = "info-block__next-incorrect invisible-block";
      errorBlock.children[1].textContent = "";
    }, 2000);
  };

  const getCorrect = (e) => {
    const btn = e.target.closest(`.passenger-${number}`).querySelector(".info-block__next-btn");
    const correctBlock = e.target.closest(`.passenger-${number}`).querySelector(".info-block__next-correct");
    correctBlock.className = "info-block__next-correct";
    btn.style.zIndex = "1";
    setTimeout(() => {
      correctBlock.className = "info-block__next-correct invisible-block";
      btn.style.zIndex = "0";
    }, 1500);
  };

  const handleNextPassenger = (e) => {
    e.preventDefault();
    const age = e.target.closest(`.passenger-${number}`).querySelector(".info-block__select-btn").value;

    const lastName = e.target.closest(`.passenger-${number}`).querySelector('input[name="second-name"]').value;
    const firstName = e.target.closest(`.passenger-${number}`).querySelector('input[name="first-name"]').value;
    const patronymic = e.target.closest(`.passenger-${number}`).querySelector('input[name="third-name"]').value;
    if (!firstName || !lastName) getError(e, "Укажите полные ФИО");

    const gender = ![...e.target.closest(`.passenger-${number}`).querySelectorAll(".personal-gender__radio-input")][0].checked 
    && ![...e.target.closest(`.passenger-${number}`).querySelectorAll(".personal-gender__radio-input")][1].checked
    ? getError(e, "Выберите пол") 
    : e.target.closest(`.passenger-${number}`).querySelector(".personal-gender__radio-input").checked 
    ? true : false;

    const birthday = e.target.closest(`.passenger-${number}`).querySelector(".personal-birth__input").value;
    const toDay = new Date();
    const birth = new Date(birthday);
    const isFuture = birth.getTime() > toDay.getTime();
    if (!birthday || isFuture) getError(e, "Дата рождения указано неверно");

    const documentType = e.target.closest(`.passenger-${number}`).querySelector('input[name="document-type"]').value;

    const documentSeries = e.target.closest(`.passenger-${number}`).querySelector('input[id="series"]').value;
    const documentNumber = e.target.closest(`.passenger-${number}`).querySelector('input[id="number"]').value;
    const documentBirth = e.target.closest(`.passenger-${number}`).querySelector('input[id="birth-number"]').value;
    const documentData = documentType === "Паспорт" ? `${documentSeries}${documentNumber}` : documentBirth;
    if (!documentData) getError(e, "Укажите тип и номер документа");

    let babyCount;
    if ((number < depAdultChildCount) && +orderState.departure_person_count.baby) {
      if (+orderState.departure_person_count.baby > number || +orderState.departure_person_count.baby === number) {
        babyCount = true;
      } else {
        babyCount = false;
      }
    } else {
      babyCount = false;
    }
    if ((number > depAdultChildCount) && +orderState.arrival_person_count.baby) {
      if (+orderState.arrival_person_count.baby > (number-depAdultChildCount) || +orderState.arrival_person_count.baby === (number-depAdultChildCount)) {
        babyCount = true;
      } else {
        babyCount = false;
      }
    } else {
      babyCount = false;
    }

    if (firstName && lastName && birthday && documentData) {
      getCorrect(e);

      const obj = {
        coach_id: number-1 < depAdultChildCount ? orderState.departure.seats[number-1].coach_id : orderState.arrival.seats[number-1-depAdultChildCount].coach_id,
        seat_number: number-1 < depAdultChildCount ? orderState.departure.seats[number-1].seat_number : orderState.arrival.seats[number-1-depAdultChildCount].seat_number,
        is_child: age === "взрослый" ? false : true,
        include_children_seat: babyCount,
        person_info: {
          is_adult: age === "взрослый" ? true : false,
          first_name: firstName,
          last_name: lastName,
          patronymic: patronymic,
          gender: gender,
          birthday: birthday,
          document_type: documentType,
          document_data: documentData,
        },
      }

      if (number-1 < depAdultChildCount) {
        setPayState({
          ...payState,
          departure: {
            ...payState.departure,
            route_direction_id: orderState.departure.route_direction_id,
            seats: [
              ...payState.departure.seats, 
              obj,
            ],
          },
        });
      } else {
        setPayState({
          ...payState,
          arrival: {
            ...payState.arrival,
            route_direction_id: orderState.arrival.route_direction_id,
            seats: [
              ...payState.arrival.seats, 
              obj,
            ],
          },
        });
      }

    }
  };

  return (
    <>
      { showComponent && 
      <div className={`passengers-info-block info-block passenger-${number}`}>

        <div className="info-block__control">
          <input className="info-block__control-btn" id={`info-block-${number}`} type="checkbox"/>
          <label htmlFor={`info-block-${number}`}>{`Пассажир ${number}`}</label>

          <div className="info-block__container">
            <div className="info-block__select">
              <input 
                className="info-block__select-btn" 
                type="button" 
                data-value={age.dataValue} 
                value={age.value} 
                onClick={handleOpenList}/>
              <div className="info-block__select-options">
                <input 
                  className="info-block__select-option" 
                  type="button" 
                  data-value={"adult"} 
                  value="взрослый" 
                  onClick={handleAge}/>
                <input 
                  className="info-block__select-option" 
                  type="button" 
                  data-value={"kid"} 
                  value="детский" 
                  onClick={handleAge}/>
              </div>
            </div>

            <div className="info-block__personal-container">
              <div className="info-block__personal-info personal-second-name">
                <label htmlFor="second-name">Фамилия</label>
                <input type="text" name="second-name" id="second-name" onInput={checkFIO} required/>
              </div>

              <div className="info-block__personal-info personal-first-name">
                <label htmlFor="first-name">Имя</label>
                <input type="text" name="first-name" id="first-name" onInput={checkFIO} required/>
              </div>

              <div className="info-block__personal-info personal-third-name">
                <label htmlFor="third-name">Отчество</label>
                <input type="text" name="third-name" id="third-name" onInput={checkFIO} required/>
              </div>
            </div>

            <div className="info-block__personal-container">
              <div className="personal-gender">
                <fieldset className="personal-gender__fieldset">
                  <legend className="personal-gender__legend">Пол</legend>
                  <div className="personal-gender__radio-container">
                    <label className="personal-gender__radio-label">
                      <input className="personal-gender__radio-input" name="gender" type="radio" value="male"/>
                      <span className="personal-gender__radio-text">М</span>
                    </label>
                    <label className="personal-gender__radio-label">
                      <input className="personal-gender__radio-input" name="gender" type="radio" value="female"/>
                      <span className="personal-gender__radio-text">Ж</span>
                    </label>
                  </div>
                </fieldset>
              </div>

              <div className="personal-birth">
                <label className="personal-birth__label" htmlFor="birth">Дата рождения</label>
                <input className="personal-birth__input" type="date" name="birth" id="birth"/>
              </div>
            </div>

            <div className="info-block__checkbox">
              <input className="personal__checkbox-input" id="limited-mobility" name="limited-mobility" type="checkbox" value="limited-mobility"/>
              <label className="personal__checkbox-label" htmlFor="limited-mobility">ограниченная подвижность</label>
            </div>

            <div className="info-block__identity" onClick={handleChangeDocument}>
              <div className="info-block__select info-block__identity-select">
                <label className="info-block__identity-label" htmlFor="document-type">
                  Тип документа
                </label>
                <input 
                  className="info-block__select-btn passengers__select-btn" 
                  name="document-type" 
                  id="document-type" 
                  type="button" 
                  data-value={document.dataValue} 
                  value={document.value} 
                  onClick={handleOpenList}/>
                <div className="info-block__select-options passengers__select-options">
                  <input 
                    className="info-block__select-option passengers__select-option" 
                    type="button" 
                    data-value={"passport"} 
                    value="Паспорт" 
                    onClick={handleDocument}/>
                  <input 
                    className="info-block__select-option passengers__select-option" 
                    type="button" 
                    data-value={"birth-certificate"} 
                    value="Свидетельство о рождении" 
                    onClick={handleDocument}/>
                </div>
              </div>

              <div className="select-option select-option__passport">
                <div className="info-block__personal-info personal-passport">
                  <label htmlFor="series">Серия</label>
                  <input type="number" name="series" id="series" placeholder="__  __  __  __" onInput={checkPassportSeries}/>
                </div>

                <div className="info-block__personal-info personal-passport">
                  <label htmlFor="number">Номер</label>
                  <input type="number" name="number" id="number" placeholder="__  __  __  __  __  __" onInput={checkPassportNumber}/>
                </div>
              </div>

              <div className="select-option select-option__birth-certificate invisible-block">
                <div className="info-block__personal-info personal-birth-certificate">
                  <label htmlFor="birth-number">Номер</label>
                  <input type="text" name="birth-number" id="birth-number" placeholder="__  __  __  __  __  __  __  __  __  __  __  __" onInput={checkBirthNumber}/>
                </div>
              </div>
            </div>

            <div className="info-block__next-section">
              <button className="info-block__next-btn" type="button" onClick={handleNextPassenger}>Следующий пассажир</button>
              <div className="info-block__next-incorrect invisible-block">
                <div></div>
                <p>Номер свидетельства о рождении указан некорректно<br/>Пример: <b>VIII-ЫП-123456</b></p>
              </div>
              <div className="info-block__next-correct invisible-block">
                <div></div>
                <p>Готово</p>
              </div>
            </div>
          </div>

          <button className="info-block__delete-btn" type="button" onClick={handleDeleteBlock}></button>
        </div>

      </div>
      }
    </>
  );
}

export default PassengersInfoBlock;

PassengersInfoBlock.propTypes = {
  number: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};
