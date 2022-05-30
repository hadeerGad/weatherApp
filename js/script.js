// (function($, document, window){

// 	$(document).ready(function(){

// 		// Cloning main navigation for mobile menu
// 		$(".mobile-navigation").append($(".main-navigation .menu").clone());

// 		// Mobile menu toggle 
// 		$(".menu-toggle").click(function(){
// 			$(".mobile-navigation").slideToggle();
// 		});

// 		var map = $(".map");
// 		var latitude = map.data("latitude");
// 		var longitude = map.data("longitude");
// 		if( map.length ){

// 			map.gmap3({
// 				map:{
// 					options:{
// 						center: [latitude,longitude],
// 						zoom: 15,
// 						scrollwheel: false
// 					}
// 				},
// 				marker:{
// 					latLng: [latitude,longitude],
// 				}
// 			});

// 		}
// 	});

// 	$(window).load(function(){

// 	});

// })(jQuery, document, window);



// todays card variables:
let today = document.getElementById("today"),
	todayDate = document.getElementById("today-date"),
	cityLocation = document.getElementById("location"),
	todayDegree = document.getElementById("today-degree"),
	todayIcon = document.getElementById("today-icon"),
	description = document.getElementById("today-description"),
	humidty = document.getElementById("humidty"),
	wind = document.getElementById("wind"),
	compass = document.getElementById("compass"),
	searchBar= document.getElementById("search-bar");

// next days
let nextDay = document.getElementsByClassName("nextDay"),
	nextDayIcon = document.getElementsByClassName("nextDay-icon"),
	maxDegree = document.getElementsByClassName("max-degree"),
	minDegree = document.getElementsByClassName("min-degree"),
	nextDayDescription = document.getElementsByClassName("nextDay-description");

let weatherData ,response ,searchValue="cairo";

// fetch data from api
async function weather() {
	 weatherData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${searchValue}&days=4`);
	 response = await weatherData.json();
	console.log(response);
	currentDate();
	displayNextDayWeather();
}
weather()

let days=["sunday" , "monday" , "tuesday" ,"wednesday" ,"thursday" ,"firday" ,"saturday"];
let months=["january" ,"february" ,"march" ,"april" ,"may" ,"june" ,"july" ,"august" ,"septemper" ,"october", "november", "december"];

function currentDate(){
let date= new Date();
// youm kam =date.getDate()
today.innerHTML=days[date.getDay()];
todayDate.innerHTML=`${date.getDate()} ${months[date.getMonth()]}` 
cityLocation.innerHTML=response.location.name;
todayDegree.innerHTML= response.current.temp_c;
todayIcon.setAttribute("src",`https:${response.current.condition.icon}`);
description.innerHTML=response.current.condition.text;
wind.innerHTML=response.current.wind_kph;
humidty.innerHTML=response.current.humidity;
compass.innerHTML=response.current.wind_dir;
// console.log(days[new Date(response.forecast.forecastday[0].date).getDay()]  );
// console.log( "https:");
}


// console.log( days[new Date(2022-01-22).getDay()] );
function displayNextDayWeather(){
	for(let i=0;i<nextDay.length;i++){
		nextDay[i].innerHTML=days[new Date(response.forecast.forecastday[i+1].date).getDay()] ;
		nextDayIcon[i].setAttribute("src",`https:${response.forecast.forecastday[i+1].day.condition.icon }`);
		maxDegree[i].innerHTML=response.forecast.forecastday[i+1].day.maxtemp_c;
		minDegree[i].innerHTML=response.forecast.forecastday[i+1].day.mintemp_c;
		nextDayDescription[i].innerHTML=response.forecast.forecastday[i+1].day.condition.text;
		
	}
}


// search city
searchBar.addEventListener("keydown",function(){
  searchValue= searchBar.value;
  weather();

})