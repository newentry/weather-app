



$.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=Uckfield&units=metric&appid=5b5393bafaa87fba80fc2c0ab113981e", 
	function(data){
		console.log(data);
		
		var icon = "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
		var weather = data.list[0].weather[0].main;
		var temp = Math.floor(data.list[0].main.temp);
		
		$(".icon").attr("src", icon);
		$(".weather").append(weather);
		$(".temp").append(temp); 
		}
	);