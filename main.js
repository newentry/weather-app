var parent = document.getElementById('parent');
var click = document.getElementById('button');
var dropdownMenu = document.getElementById("dropdown-menu");

// Needed for dropdown menu to show on menu mouseover.

click.onmouseover = function(argument) {
	var dropdownMenu = document.getElementById("dropdown-menu");
	if (dropdownMenu.style.display !== "block") {
		dropdownMenu.style.display = "block";
	}
}

parent.onmouseout = function(argument) {
	if (dropdownMenu.style.display === "block") {
		dropdownMenu.style.display = "none";
	}
}


// Get focus onto search input while clicking on "find a forecast".

function getFocus(event) {
	// Prevent page refresh
	event.preventDefault();
	document.getElementById("location-search-input").focus();
}
// Generates and appends weather forecast data for specific time.
function displayForecastForTime(dtime, icon, weather, temp) {

	var table = '<div class="all-data" >\
			<div class="date-time">' + dtime + '</div>\
			<div class="img-icon"><img src="' + icon + '"></div>\
			<div class="temp">' + temp + "°" + '</div>\
			<div class="weather">' + weather + '</div>\
		</div>';

	$(".table-content2").append(table);
}
// Processing forecast data for time at index.

function processForecastDataAtTime(list, index) {

	var listIndex = list[index];
	var dtime = listIndex.dt_txt;
	var temp = Math.floor(listIndex.main.temp);

	for (var i = 0; i < listIndex.weather.length; i++) {

		var listWeather = listIndex.weather[i];

		var icon = "http://openweathermap.org/img/w/" + listWeather.icon + ".png";
		var weather = listWeather.main;

		displayForecastForTime(dtime, icon, weather, temp);
	}
}

// Handles city input from user for returning forecast. 
function handleUserForecastRequest() {
	var city = document.getElementById("location-search-input").value;

	$(".table-content2").html("");

	$.getJSON("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=5b5393bafaa87fba80fc2c0ab113981e",
			// Success handler.	
			function(data) {
				document.getElementById("show-controls").style.display = "block";
				document.getElementById("content-weather").style.display = "block";
				document.getElementById("alert").style.display = "none";

				for (var i = 0; i < data.list.length; i++) {
					processForecastDataAtTime(data.list, i);
				}
			}
		)
		.fail(function() {
			document.getElementById("show-controls").style.display = "none";
			document.getElementById("alert").style.display = "block";
		});
	// On submit prevents page refresh.
	return false;
};

var leftArrow = document.querySelector('.left');
var rightArrow = document.querySelector('.right');
var sectionIndex = 0;
// Handles right scrolling.
rightArrow.addEventListener('click', function() {
	sectionIndex = (sectionIndex < 9) ? sectionIndex + 1 : 10;
	var slider = document.querySelector('.table-content2');
	slider.style.transform = 'translate(' + (sectionIndex) * -25 + '%)';
	slider.style.transition = 'all 0.5s';
});
// Handles left scrolling.
leftArrow.addEventListener('click', function() {
	sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 0;
	var slider = document.querySelector('.table-content2');
	slider.style.transform = 'translate(' + (sectionIndex) * -25 + '%)';
});