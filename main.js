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

		var table ='<table class="all-data" border=1>\
			<tr>\
				<td class="date-time">' + dtime + '</td>\
			</tr>\
			<tr>\
				<td class="current-forecast"><td>\
			</tr>\
			<tr>\
				<td><img src="' + icon +'"></td>\
			</tr>\
			<tr>\
				<td class="temp">' + temp + '</td>\
			</tr>\
			<tr>\
				<td class="weather">' + weather + '</td>\
			</tr>\
		</table>';
		
		
		$(".table-content2").append(table);
return false;
		/*$(".date-time").append(dtime);   
		$(".icon").attr("src", icon);
		$(".weather").append(weather);
		$(".temp").append(temp); 
		console.log(dtime);*/
}

function data_return(list, index) {
		
		var listIndex = list[index];

		var dtime = listIndex.dt_txt;
		var temp = Math.floor(listIndex.main.temp);

	for (var i = 0; i < listIndex.weather.length; i++) {
		
		var listWeather = listIndex.weather[i];

		var icon = "http://openweathermap.org/img/w/" + listWeather.icon + ".png";
		var weather = listWeather.main;

		add(dtime, icon, weather, temp);
	}
		
	
}

function location_input(event) {
	var city = document.getElementById("location-search-input").value;

	
	$(".table-content2").html("");
	

$.getJSON("https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&units=metric&appid=5b5393bafaa87fba80fc2c0ab113981e", 
	function(data){
		
		document.getElementById("show-controls").style.display = "block";	
		document.getElementById("content-weather").style.display = "block";
		document.getElementById("alert").style.display = "none";

		var i;
		

		for( i=0; i<data.list.length; i++){
			
			data_return(data.list, i);
			
		}
	}
	)
	
	.fail(function() {
   		document.getElementById("show-controls").style.display = "none"; 
   		document.getElementById("alert").style.display= "block";
   	});


	
	return false;
};


var leftArrow = document.querySelector('.left');
var rightArrow = document.querySelector('.right');
var sectionIndex = 0;

rightArrow.addEventListener('click', function(){
		sectionIndex = (sectionIndex <9) ? sectionIndex +1 : 10;
	var slider = document.querySelector('.table-content2');
		slider.style.transform = 'translate(' + (sectionIndex) * -25 + '%)';
		slider.style.transition = 'all 0.5s';
});

leftArrow.addEventListener('click', function(){
		sectionIndex = (sectionIndex >0) ? sectionIndex -1 : 0;
	var slider = document.querySelector('.table-content2');
		slider.style.transform = 'translate(' + (sectionIndex) * -25 + '%)';
});


