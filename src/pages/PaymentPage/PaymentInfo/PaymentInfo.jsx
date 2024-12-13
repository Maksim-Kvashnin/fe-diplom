import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import PayContext from "#context/payContext";
import ValidationEmail from "#services/ValidationEmail";
import "./PaymentInfo.css";

function PaymentInfo() {
  const {payState, setPayState} = useContext(PayContext);
  const navigate = useNavigate();

  const checkFIO = (e) => {
    e.preventDefault();
    e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-Я]/gi, '');
  };

  const checkPhoneNumber = (e) => {
    e.preventDefault();
    e.target.value = e.target.value.replace(/^((\+7|7|8)+([0-9]){11})$/g, '');
    e.target.value = e.target.value.replace(/[0-9]{12}/g, '');
  };

  const checkEmail = (e) => {
    e.preventDefault();
    if (!ValidationEmail(e.target.value)) {
      e.target.style.borderColor = "red"
    } else {
      e.target.style.borderColor = ""
    }
  };

  const checkPayOnline = (e) => {
    e.preventDefault();
    let online = e.target.closest(".payment-info__wrapper").querySelector('input[name="pay-online"]');
    let cash = e.target.closest(".payment-info__wrapper").querySelector('input[name="pay-cash"]');
    if (online.checked) {
      cash.checked = false;
    } else {
      cash.checked = true;
    }
  };

  const checkPayCash = (e) => {
    e.preventDefault();
    let cash = e.target.closest(".payment-info__wrapper").querySelector('input[name="pay-cash"]');
    let online = e.target.closest(".payment-info__wrapper").querySelector('input[name="pay-online"]');
    if (cash.checked) {
      online.checked = false;
    } else {
      online.checked = true;
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const lastName = e.target.closest(".payment-info__wrapper").querySelector('input[name="second-name"]').value;
    const firstName = e.target.closest(".payment-info__wrapper").querySelector('input[name="first-name"]').value;
    const patronymic = e.target.closest(".payment-info__wrapper").querySelector('input[name="third-name"]').value;
    const phone = e.target.closest(".payment-info__wrapper").querySelector('input[name="phone"]').value;
    const email = e.target.closest(".payment-info__wrapper").querySelector('input[name="mail"]').value;
    const payOnline = e.target.closest(".payment-info__wrapper").querySelector('input[name="pay-online"]').checked;
    const payCash = e.target.closest(".payment-info__wrapper").querySelector('input[name="pay-cash"]').checked;
    const paymentMethod = payOnline ? "online" : payCash ? "cash" : "online";

    if (firstName && lastName && phone && email && paymentMethod) {
      setPayState({
        ...payState,
        user: {
          first_name: firstName,
          last_name: lastName,
          patronymic: patronymic,
          phone: phone,
          email: email,
          payment_method: paymentMethod,
        }
      });
      navigate("/fe-diplom/order/confirm");
    }
  };

  return (
    <div className="payment-info__wrapper">
      <div className="payment-info__personal-container">
        <div className="payment-info__personal-block">
          <p className="payment-info__personal-title">Персональные данные</p>

          <div className="payment-info__content">
            <div className="info-block__personal-info payment-info__second-name">
              <label htmlFor="second-name">Фамилия</label>
              <input type="text" name="second-name" id="second-name" onInput={checkFIO}/>
            </div>

            <div className="info-block__personal-info payment-info__first-name">
              <label htmlFor="first-name">Имя</label>
              <input type="text" name="first-name" id="first-name" onInput={checkFIO}/>
            </div>

            <div className="info-block__personal-info payment-info__third-name">
              <label htmlFor="third-name">Отчество</label>
              <input type="text" name="third-name" id="third-name" onInput={checkFIO}/>
            </div>

            <div className="info-block__personal-info payment-info__phone">
              <label htmlFor="phone">Контактный телефон</label>
              <input type="number" name="phone" id="phone" placeholder="+7" onInput={checkPhoneNumber}/>
            </div>

            <div className="info-block__personal-info payment-info__mail">
              <label htmlFor="mail">E-mail</label>
              <input type="email" name="mail" id="mail" placeholder="inbox@gmail.com" onInput={checkEmail}/>
            </div>
          </div>
        </div>

        <div className="payment-info__pay-block">
          <p className="payment-info__pay-title">Способ оплаты</p>
          <div className="info-block__checkbox payment-info__pay-checkbox info__pay-online">
            <input className="personal__checkbox-input" id="pay-online" name="pay-online" type="checkbox" value="pay-online" onInput={checkPayOnline}/>
            <label className="personal__checkbox-label" htmlFor="pay-online">Онлайн</label>
          </div>
          <div className="payment-info__pay-options">
            <p>Банковской картой</p>
            <p>PayPal</p>
            <p>Visa QIWI Wallet</p>
          </div>
          <div className="info-block__checkbox payment-info__pay-checkbox info__pay-checkbox">
            <input className="personal__checkbox-input" id="pay-cash" name="pay-cash" type="checkbox" value="pay-cash" onInput={checkPayCash}/>
            <label className="personal__checkbox-label" htmlFor="pay-cash">Наличными</label>
          </div>
        </div>
      </div>

      <div className="payment-info__pay-btn">
        <button className="payment-info__btn" type="button" onClick={handleClick}>Купить билеты</button>
      </div>
    </div>
  );
}

export default PaymentInfo;
