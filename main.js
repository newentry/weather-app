function show_hide(argument) {
	var click = document.getElementById('dropdown-menu');
	if (click.style.display === "none") {
		click.style.display = "block";
	}
	else {
		click.style.display = "none";
	}
}

function getFocus() {
	$("a").click(function(event){
  	event.preventDefault();
});
	var focus2 = document.getElementById("location-search-input").focus();
	return focus2;

}

function add(dtime, icon, weather, temp) {

		var table ='<table border=1>\
			<tr>\
				<td class="date-time">' + dtime + '</td>\
			</tr>\
			<tr>\
				<td class="current-forecast"><td>\
			</tr>\
			<tr>\
				<td><img class="icon"></td>\
			</tr>\
			<tr>\
				<td class="temp">' + temp + '</td>\
			</tr>\
			<tr>\
				<td class="weather">' + weather + '</td>\
			</tr>\
		</table>';
		
		
		$("#content-weather").append(table);

		/*$(".date-time").append(dtime);   
		$(".icon").attr("src", icon);
		$(".weather").append(weather);
		$(".temp").append(temp); 
		console.log(dtime);*/
}

function data_return(list, index) {
		
		
		var dtime = list[index].dt_txt;
		var icon = "http://openweathermap.org/img/w/" + list[index].weather[0].icon + ".png";
		var weather = list[index].weather[0].main;
		var temp = Math.floor(list[index].main.temp);
		
		
		
	add(dtime, icon, weather, temp);
}

function location_input(event) {
	var city = document.getElementById("location-search-input").value;
	
$.getJSON("https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&units=metric&appid=5b5393bafaa87fba80fc2c0ab113981e", 
	
	function(data){
		console.log(data);
		
		var day = "Today"
		$("#content-weather").html(day);
		var i;
		
		for( i=0; i<data.list.length; i++){
			
			data_return(data.list, i);
			console.log(data_return);
		}
	}
	);
	
	return false;
}
