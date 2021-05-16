const getWeather = () => {

	const submit = document.getElementById("submit");
	submit.addEventListener("click", async() => {

		const city = document.getElementById("city").value;
		const infoPara = document.getElementById("response");

		infoPara.style.background = "grey";
		infoPara.textContent = `Loading...`

		const weatherData = await getApiData(infoPara, city);

		console.log(weatherData);
		if(weatherData.cod !== 200) {
			infoPara.style.background = "red";
			infoPara.textContent = "Failed to load API data.";
			return;
		}
		
		sNowConnection(infoPara, weatherData);

	})



	async function getApiData(infoPara, city) {
		try {
			const getData = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0a5b9dce4fe5241cd2226516f9996082`);
			const result = await getData.json();	
	
			return new Promise(resolve => {
				resolve(result);
			})

		} catch (error) {
			infoPara.style.background = "red";
			infoPara.textContent = error.message;
		}

	}

	function sNowConnection(infoPara, weatherData) {
		var requestBody = `{
			"city":"${weatherData.name}",
			"current_temp":"${weatherData.main.temp}",
			"feels_like":"${weatherData.main.feels_like}",
			"max_temp":"${weatherData.main.temp_max}",
			"min_temp":"${weatherData.main.temp_min}",
			"wind_speed":"${weatherData.wind.speed}"
		}`; 

		var client=new XMLHttpRequest();
		client.open("post","https://dev97779.service-now.com/api/now/table/x_622840_testplay_weather");
		
		client.setRequestHeader('Accept','application/json');
		client.setRequestHeader('Content-Type','application/json');
		
		//Eg. UserName="admin", Password="admin" for this code sample.
		client.setRequestHeader('Authorization', 'Basic '+btoa('admin'+':'+'Cody54321!!'));
		
		client.onreadystatechange = function() { 
			if(this.readyState == this.DONE) {

				infoPara.style.background = "green";
				infoPara.textContent = `Weather data for ${weatherData.name} were loaded to ServiceNow`;

			}
		}; 

		client.send(requestBody);
	}


}

getWeather();