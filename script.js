const openWeatherEnd = "https://api.openweathermap.org/data/2.5/";
const openWeatherCurrent = "weather?q=";
const openWeather1 = "onecall?lat=";
const openWeather2 = "&lon=";
const openWeather3 = "&units=imperial";
const APIkey = "&appid=cf842424f641e0b265e27e57cf71442b";

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

//Save city
function setSavedSearch(){
    if (savedSearch.length .0) {
        localStorage.setItem(lastSearchName, lastSearch);
        localStorage.setItem(savedSearchesName, JSON.stringify(savedSearche))
    }
}
//display search
function searchDisplay(){
    const listItemDef1 = '<a href="#" class="list-group-item list-group-item-action" value=';
    const listItemDef2 = '>';
    const listItemDef3 = '</a>'
    var cityListDiv = $("#city-list"); 
    cityListDiv.empty();

    for (let i=0; i<savedSearch.length; i++) {
        cityListDiv.append(listItemDef1 + i + listItemDef2 + savedSearch[i].name + listItemDef3);
    }
    $(".list-group-item-action").click(getCityWeather);
}

function cityInfo(){
    var cityFound = false;
    for (let i=0; i<savedSearch.length; i++) {
        if (cityName.toLowerCase() === savedSearch[i].name.toLowerCase()) {
            cityFound = true;
            lastSearch = i;
            localStorage.setItem(lastSearchName, lastSearch);
        }
    }

    if (!cityFound) {
        var newCityInfo = {};
        var openWeatherURL = openWeatherEnd + openWeatherCurrent + cityName + APIkey;

        $.ajax({
            url: openWeatherURL,
            method: "GET"
        }).then(function (response) {
            newCityInfo.name = response.name; 
            newCityInfo.lat = response.coord.lat; 
            newCityInfo.lon = response.coord.lon; 
            lastSearch = savedSearch.push(newCityInfo) - 1; 
            setsavedSearch(); 
            searchDisplay();
            weatherDisplay();
        }).catch(function (error) {
            if (error.status == 404) {
                $("#errorMsg").text('City "' + cityName + '" not found. Please check spelling and try again.');
            }
            else {
                $("#errorMsg").text("Sorry, cannot retrieve weather information. Please try again later.");
            }
            $(".modal").modal('show');
        });
    }
    else {
        weatherDisplay(); 
    }
}

function weatherDisplay(){

}

function doSearch(event){
    event.preventDefault();
    event.preventDefault();                                     
    var citySearchInput = $("#city-search-input");
    var city = citySearchInput.val().trim();

    if (city === "") {
        $("#errorMsg").text("Please enter a city name.");
        $(".modal").modal('show');
    }
    else {
        citySearchInput.val("");
        cityInfo(city);
    }   
}

function getCityWeather(event){
    event.preventDefault();
    lastSearch = $(this).attr("value");
    localStorage.setItem(lastSearchName, lastSearch);
    weatherDisplay();
}