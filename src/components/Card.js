import React from "react";

const Cards = ({
  month,
  date,
  year,
  day,
  icon,
  description,
  tempHigh,
  tempLow,
  humidity,
  windspeed,
}) => {
  return (
    <div className="Card">
      <div className="CompleteDate">
        <h3>{day}</h3>
        <h6>
          {month}/{date}/{year}
        </h6>
      </div>
        <img className="city-icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={description}></img>
      <h4>{description}</h4>
      <h4>
        High: {tempHigh} / Low: {tempLow}{" "}
      </h4>
      <h4>Humidity: {humidity}</h4>
      <h4>WindSpeed: {windspeed}</h4>
    </div>
  );
};

export default Cards;
