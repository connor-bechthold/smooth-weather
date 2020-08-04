import React, { Component } from "react";
import "./App.css";
import Weather from "./components/Weather";
import Input from "./components/Input";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cityValue: "",
			countryValue: "",
			weather: "",
			countryError: "no",
		};
	}

	handleCityChange = (e) => {
		this.setState({ cityValue: e.target.value });
	};

	handleCountryChange = (e) => {
		this.setState({ countryValue: e.target.value });
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		if (this.state.countryValue.length === 2) {
			let request = await fetch(
				`weather/${this.state.cityValue}/${this.state.countryValue}`
			);
			let data = await request.json();
			this.setState({ weather: data, countryError: "no" });
		} else {
			this.setState({ weather: "", countryError: "yes" });
		}
	};

	render() {
		return (
			<div className="App">
				<Input
					cityValue={this.state.cityValue}
					countryValue={this.state.countryValue}
					handleCityChange={this.handleCityChange}
					handleCountryChange={this.handleCountryChange}
					handleSubmit={this.handleSubmit}
					weather={this.state.weather}
				/>
				<Weather
					weather={this.state.weather}
					countryError={this.state.countryError}
				/>
			</div>
		);
	}
}

export default App;
