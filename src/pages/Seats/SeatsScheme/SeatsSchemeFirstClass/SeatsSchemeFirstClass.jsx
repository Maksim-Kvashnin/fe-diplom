import React from "react";
import PropTypes from "prop-types";

function SeatsSchemeFirstClass({seats, onChange}) {
  const getStatus = (i) => {
    const boo = seats.find(item => item.index === i);
    return boo ? boo.available : false;
  };

  const handleSeat = (e) => {
    e.preventDefault();
    let coachId;
    const way = [...e.target.ownerDocument.querySelectorAll(".seats__container")];
    const item = e.target.closest(".scheme__seats-item");
    const wagonName = e.target.closest(".seats__wagon-details").firstElementChild.querySelector(".wagon-number").textContent;

    if (e.target.closest(".seats__container").dataset.name === "departure") {
      const inputValue = way[0].querySelector('input[name="adult"]').value;
      if (!inputValue || +inputValue === 0) {
        const inputLabel = way[0].querySelector('input[name="adult"]').parentElement;
        inputLabel.style.outline = "10px solid #ff3d0061";
        setTimeout(() => inputLabel.style.outline = "none", 1000);
      } else {
        item.classList.toggle("selected");
        coachId = [...way[0].querySelectorAll(".wagon-details__item")].filter(item => item.textContent === wagonName)[0].id;
        onChange({
          way: e.target.closest(".seats__container").dataset.name,
          type: "first",
          coach_id: coachId,
          seatIndex: item.textContent, 
          seatSide: "", 
          selected: [...item.classList].includes("selected"),
        });
      }
    } 

    if (e.target.closest(".seats__container").dataset.name === "arrival") {
      const inputValue = way[1].querySelector('input[name="adult"]').value;
      if (!inputValue || +inputValue === 0) {
        const inputLabel = way[1].querySelector('input[name="adult"]').parentElement;
        inputLabel.style.outline = "10px solid #ff3d0061";
        setTimeout(() => inputLabel.style.outline = "none", 1000);
      } else {
        item.classList.toggle("selected");
        coachId = [...way[1].querySelectorAll(".wagon-details__item")].filter(item => item.textContent === wagonName)[0].id;
        onChange({
          way: e.target.closest(".seats__container").dataset.name,
          type: "first",
          coach_id: coachId,
          seatIndex: item.textContent, 
          seatSide: "", 
          selected: [...item.classList].includes("selected"),
        });
      }
    }
  };

  return (
    <div className="scheme__seats-container scheme__seats-first-class">

      <ul className="scheme__seats-list scheme__seats-first-class scheme__seats-right-side">
        {[...Array(8)].map((_, i) => {
          return (
            <li className="scheme__seats-placement" key={i}>

              <div className="scheme__seats-row scheme__seats-row_first-class">
                <div className="scheme__seats-item-container">
                  <button 
                    className="scheme__seats-item scheme__seats-item_first-class" 
                    type="button"
                    disabled={!getStatus(i * 2 + 1)}
                    onClick={handleSeat}
                  >
                    {i * 2 + 1}
                  </button>
                </div>
              </div>

              <div className="scheme__seats-row scheme__seats-row_first-class">
                <div className="scheme__seats-item-container">
                  <button 
                    className="scheme__seats-item scheme__seats-item_first-class" 
                    type="button"
                    disabled={!getStatus(i * 2 + 2)}
                    onClick={handleSeat}
                  >
                    {i * 2 + 2}
                  </button>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <ul className="scheme__seats-list scheme__seats-first-class scheme__seats-left-side">
        {[...Array(8)].map((_, i) => {
          return (
            <div className="scheme__seats-row_left-train-side scheme__seats-row_empty" key={i}></div>
          )
        })}
      </ul>
    </div>
  );
}

export default SeatsSchemeFirstClass;

SeatsSchemeFirstClass.propTypes = {
  seats: PropTypes.array || PropTypes.object,
  onChange: PropTypes.func,
};
