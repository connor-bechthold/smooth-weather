import React from "react";
import "./Input.css";

function Input(props) {
	return (
		<div>
			{this}
			<p
				style={{
					fontSize: "20px",
					color: "#ededed",
					textAlign: "left",
					paddingLeft: "4px",
				}}
			>
				<i className="fa fa-cloud"></i>Weather App{" "}
			</p>
			<form onSubmit={props.handleSubmit} className="input-flex">
				<input
					className="input1"
					type="text"
					value={props.cityValue}
					onChange={props.handleCityChange}
					placeholder="Enter City"
				/>
				<input
					className="input2"
					type="text"
					value={props.countryValue}
					onChange={props.handleCountryChange}
					placeholder="Enter 2 Letter Country Code"
				/>
				<input type="submit" value="Get Weather" className="btn get-weather" />
			</form>
		</div>
	);
}

export default Input;
