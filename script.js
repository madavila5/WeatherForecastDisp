const openWeatherEnd = "https://api.openweathermap.org/data/2.5/";
const openWeatherCurrent = "weather?q=";
const openWeather1 = "onecall?lat=";
const openWeather2 = "&lon=";
const openWeather3 = "&units=imperial";
const APIkey =

const savedSearchesName = "weatherDashboardSavedCities"; // localstorage
const lastSearchName = "weatherDashboardLastViewed";
var savedSearch = [];
var lastSearch = -1; 

citySaved();
$(#searchbtn).click(doSearch);
//section geting localstorage saved searches
function citySaved(){
    var searchList = JSON.parse(localStorage.getItem(savedSearchesName));
    lastSearch = localStorage.getItem(lastSearchName);
    if (searchList) {
        savedSearches = searchList;
        searchDisplay(); // Load displayed city list
        weatherDisplay(); // Display last viewed city
    }
}

function getCityWeather(event){
    event.preventDefault();
    lastSearch = $(this).attr("value");
    localStorage.setItem(lastSearchName, lastSearch);
    weatherDisplay();
}

//Save city
function setSavedSearch(){
    if (savedSearch.length .0) {
        localStorage.setItem(lastSearchName, lastSearch);
        localStorage.setItem(savedSearchesName, JSON.stringify(savedSearche))
    }
}
//display search
function searchDisplay(){

}

function cityInfo(){

}

function weatherDisplay(){

}

function doSearch(event){
    event.preventDefault();
    
}








