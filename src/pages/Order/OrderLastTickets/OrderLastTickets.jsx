import React, { useState, useEffect } from "react";
import SVGicon from "#components/SVGicon/SVGicon";
import "./OrderLastTickets.css";

function OrderLastTickets() {
  const [data, setData] = useState({});

  useEffect(() => {
    const getResult = async () => {
      try {
        const response = await fetch("https://students.netoservices.ru/fe-diplom/routes/last");
        if (!response.ok) console.error(response.status, response.statusText);
        const result = await response.json();
        setData(result);
      } catch(e) {
        console.error(e.status, e.statusText);
      }
    };
    getResult();
  }, []);

  return (
    <div className="order-last-tickets last-tickets">
      <p className="last-tickets__title">Последние билеты</p>
      <div className="last-tickets__wrapper">

      {data && data.length ? 
          data.map(item => {
            return (
              <div className="last-tickets__item ticket-item" key={item.departure._id}>
                <div className="ticket-item__city">
                  <p className="ticket-item__from_city">{item.departure.from.city.name}</p>
                  <p className="ticket-item__to_city">{item.departure.to.city.name}</p>
                </div>
                <div className="ticket-item__railway">
                  <p className="ticket-item__from_railway">{item.departure.from.railway_station_name}</p>
                  <p className="ticket-item__to_railway">{item.departure.to.railway_station_name}</p>
                </div>
                <div className="ticket-item__options">

                  {Object.entries(item.departure).map((item, i) => {
                    let iconName = "";
                    if ((item[1] && item[0] === "have_wifi") 
                      || (item[1] && item[0] === "have_air_conditioning")) {
                        iconName = item[0]
                    } else {
                      return false
                    }
                    return (
                      <div className="ticket-item__option" key={i}>
                        <SVGicon name={iconName}/>
                      </div>
                    )
                  })}

                </div>
                <p className="ticket-item__cost">
                  от
                  <span className="ticket-item__cost-value">{item.departure.min_price}</span>
                  <span className="ticket-item__cost-currency">&#8381;</span>
                </p>
              </div>
            )
          }) 
        : "Последние билеты не найдены"
      }
      </div>
    </div>
  );
}

export default OrderLastTickets;
