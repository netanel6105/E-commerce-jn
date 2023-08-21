import React from "react";

const WeatherInfo = (props) => {
  let info = props.info;
  return (
    <div className=" mt-3">
      <center>
        <h2 className="font-mono text-3xl font-bold">Weather of {info.name}</h2>
        <img
          src={`http://openweathermap.org/img/w/${info.weather[0].icon}.png`}
          alt="weather icon"
          width="200"
        />
        <h3 className="font-bold text-2xl">Condition: {info.weather[0].main}</h3>
        <h3 className="font-bold text-2xl">Temperature: {info.main.temp}</h3>
        <h3 className="font-bold text-2xl">Wind: {info.wind.speed}</h3>
      </center>
    </div>
  );
};

export default WeatherInfo;
