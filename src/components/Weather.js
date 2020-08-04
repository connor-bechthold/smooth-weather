import React from "react";
import "./Weather.css";
import Sun from "../images/iconfinder_Weather_Weather_Forecast_Hot_Sun_Day_3859136.png";
import Moon from "../images/iconfinder_Weather_Weather_Forecast_Moon_Night_Sky_3859141.png";
import scatteredCloudsDay from "../images/iconfinder_Weather_Weather_Forecast_Sunny_Sun_Cloudy_3859147.png";
import scatteredCloudsNight from "../images/iconfinder_Weather_Weather_Forecast_Moon_Night_Cloud_3859140.png";
import Clouds from "../images/iconfinder_Weather_Weather_Forecast_Cloudy_Season_Cloud_3859132.png";
import Rain from "../images/iconfinder_Weather_Weather_Forecast_Rain_Cloud_Climate_3859144.png";
import Lightning from "../images/iconfinder_Weather_Weather_Forecast_Lightning_Cloud_Storm_3859137.png";
import Snow from "../images/iconfinder_Weather_Weather_Forecast_Flake_Flakes_Snowflake_3859134.png";
import Other from "../images/iconfinder_Weather_Weather_Forecast_Typhoon_Hurricane_Climate_3859152.png";

function timeConverter(timestamp, timezone) {
	let a = new Date((timestamp + 14400 + timezone) * 1000);
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	let year = a.getFullYear();
	let month = months[a.getMonth()];
	let date = a.getDate();
	let hour = a.getHours();
	let min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
	let time;
	if (hour >= 13) {
		time = `${month} ${date}, ${year} - ${hour - 12}:${min} PM`;
	} else if (hour === 0) {
		time = `${month} ${date}, ${year} - ${12}:${min} AM`;
	} else if (hour === 12) {
		time = `${month} ${date}, ${year} - ${hour}:${min} PM`;
	} else {
		time = `${month} ${date}, ${year} - ${hour}:${min} AM`;
	}
	return time;
}

function getWeatherIcon(weather, description, icon) {
	if (weather === "Clear" && icon === "01d") {
		return <img src={Sun} style={{ width: "150px" }} alt="Sun Icon" />;
	} else if (weather === "Clear" && icon === "01n") {
		return <img src={Moon} style={{ width: "150px" }} alt="Moon Icon" />;
	} else if (
		weather === "Clouds" &&
		(description === "few clouds" || description === "scattered clouds") &&
		(icon === "02d" || icon === "03d")
	) {
		return (
			<img
				src={scatteredCloudsDay}
				style={{ width: "150px" }}
				alt="Clouds Day Icon"
			/>
		);
	} else if (
		weather === "Clouds" &&
		(description === "few clouds" || description === "scattered clouds") &&
		(icon === "02n" || icon === "03n")
	) {
		return (
			<img
				src={scatteredCloudsNight}
				style={{ width: "150px" }}
				alt="Clouds Night Icon"
			/>
		);
	} else if (
		weather === "Clouds" &&
		(description === "broken clouds" || description === "overcast clouds")
	) {
		return <img src={Clouds} style={{ width: "150px" }} alt="Cloud Icon" />;
	} else if (weather === "Drizzle") {
		return <img src={Rain} style={{ width: "150px" }} alt="Rain Icon" />;
	} else if (weather === "Rain") {
		return <img src={Rain} style={{ width: "150px" }} alt="Rain Icon" />;
	} else if (weather === "Thunderstorm") {
		return (
			<img src={Lightning} style={{ width: "150px" }} alt="Lightning Icon" />
		);
	} else if (weather === "Snow") {
		return <img src={Snow} style={{ width: "150px" }} alt="Snow Icon" />;
	} else {
		return <img src={Other} style={{ width: "150px" }} alt="Other Icon" />;
	}
}

function getTime(timestamp, timezone) {
	let a = new Date((timestamp + 14400 + timezone) * 1000);
	let hour = a.getHours();
	let min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
	let time;
	if (hour >= 13) {
		time = `${hour - 12}:${min} PM`;
	} else {
		time = `${hour}:${min} AM`;
	}
	return time;
}

function Weather(props) {
	return (
		<div>
			<div className="intro">
				{!props.weather &&
					!props.weather.message &&
					props.countryError === "no" && (
						<div className="weather-logo-box">
							<img
								src="https://weather.difer.net/assets/front/img/logo.svg"
								id="beginner-img"
								alt="Sun And Cloud Icon"
							/>
							<p style={{ color: "#ededed" }}>
								Enter a city and country to begin! A list of country codes can
								be found{" "}
								<a href="https://www.iban.com/country-codes" target="_blank">
									here
								</a>
								.
							</p>
						</div>
					)}
			</div>

			{props.weather && props.weather.message && (
				<div className="city-error">
					<p style={{ color: "#CC0000", fontSize: "30px" }}>
						{props.weather.message}
					</p>
				</div>
			)}

			{!props.weather && props.countryError === "yes" && (
				<div className="country-error">
					<p style={{ color: "#CC0000", fontSize: "30px" }}>
						please enter a 2 letter{" "}
						<a
							href="https://www.iban.com/country-codes"
							target="_blank"
							style={{ color: "#CC0000" }}
						>
							country code
						</a>
					</p>
				</div>
			)}

			{props.weather && !props.weather.message && props.countryError === "no" && (
				<div className="weather-box container">
					<div className="info">
						<h1
							style={{ fontSize: "40px" }}
						>{`${props.weather.name}, ${props.weather.sys.country}`}</h1>
						<p style={{ fontSize: "20px", color: "#253b5b" }}>
							{timeConverter(props.weather.dt, props.weather.timezone)}
						</p>
					</div>
					<div className="row temp-section">
						<div className="col-sm-6 weather-img">
							{getWeatherIcon(
								props.weather.weather[0].main,
								props.weather.weather[0].description,
								props.weather.weather[0].icon
							)}
						</div>
						<div className="col-sm-6 weather-description">
							<p
								className="temperature"
								style={{ fontSize: "60px", marginBottom: "-10px" }}
							>{`${Math.round(props.weather.main.temp)}°C`}</p>
							<p
								className="temp-description"
								style={{ color: "#253b5b", fontSize: "25px" }}
							>
								{props.weather.weather[0].description}
							</p>
						</div>
					</div>
					<hr />
					<p
						style={{ color: "#253b5b", fontSize: "20px", paddingTop: "10px" }}
					>{`Feels like ${Math.round(props.weather.main.feels_like)}°C`}</p>
					<div className="row temp-specific">
						<div className="col-sm-6">
							<p>
								<i
									className="fa fa-arrow-up"
									style={{
										color: "#253b5b",
										paddingRight: "5px",
									}}
								></i>
								{`${Math.round(props.weather.main.temp_max)}°C`}
							</p>
						</div>
						<div className="col-sm-6">
							<p>
								<i
									className="fa fa-arrow-down"
									style={{ color: "#253b5b", paddingRight: "5px" }}
								></i>
								{`${Math.round(props.weather.main.temp_min)}°C`}
							</p>
						</div>
					</div>
					<div className="row extra-weather">
						<div className="col-sm-4">
							<p>{`Humidity: ${props.weather.main.humidity}%`}</p>
						</div>
						<div className="col-sm-4">
							<p>{`Wind speed: ${props.weather.wind.speed} m/s`}</p>
						</div>
						<div className="col-sm-4">
							<p>{`Visibility: ${props.weather.visibility / 1000} km`}</p>
						</div>
					</div>
					<div className="row sun-weather">
						<div className="col-sm-6">
							<p>
								{" "}
								<i
									className="fa fa-sun-o"
									style={{ color: "#253b5b", paddingRight: "5px" }}
								></i>
								<i
									className="fa fa-arrow-up"
									style={{ color: "#253b5b", paddingRight: "5px" }}
								></i>
								{`${getTime(
									props.weather.sys.sunrise,
									props.weather.timezone
								)}`}
							</p>
						</div>
						<div className="col-sm-6">
							<p>
								{" "}
								<i
									className="fa fa-sun-o"
									style={{ color: "#253b5b", paddingRight: "5px" }}
								></i>
								<i
									className="fa fa-arrow-down"
									style={{ color: "#253b5b", paddingRight: "5px" }}
								></i>
								{`${getTime(props.weather.sys.sunset, props.weather.timezone)}`}
							</p>
						</div>
					</div>
				</div>
			)}
			{props.weather && !props.weather.message && props.countryError === "no" && (
				<p style={{ color: "#ededed" }}>
					A list of country codes can be found{" "}
					<a href="https://www.iban.com/country-codes" target="_blank">
						here
					</a>
					.
				</p>
			)}
		</div>
	);
}

export default Weather;
