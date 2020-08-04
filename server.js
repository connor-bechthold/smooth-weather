const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/weather/:city/:country", async (request, response) => {
	let cityValue = request.params.city;
	let countryValue = request.params.country;
	const api_key = process.env.API_KEY;
	let fetch_request = await fetch(
		`http://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=${api_key}&units=metric`
	);
	let data = await fetch_request.json();
	response.json(data);
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
