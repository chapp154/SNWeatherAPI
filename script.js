const getWeather = async() => {


	try {
		const getData = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Rajnochovice&units=metric&appid=0a5b9dce4fe5241cd2226516f9996082`);
		const result = await getData.json();
	
		console.log(result);



	} catch (error) {
		console.log(error.message);
	}

}

getWeather();