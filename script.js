const openWeatherEnd = "https://api.openweathermap.org/data/2.5/";
const openWeatherCurrent = "weather?q=";
const openWeather1 = "onecall?lat=";
const openWeather2 = "&lon=";
const openWeather3 = "&units=imperial";
const APIkey = "&appid=cf842424f641e0b265e27e57cf71442b";

const savedSearchesName = "weatherDashboardSavedCities"; 
const lastSearchName = "weatherDashboardLastViewed";
var savedSearch = [];
var lastSearch = -1; 

citySaved();
$("#searchbtn").click(doSearch);
$(".modal").modal('hide'); 

function citySaved() { 
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
    if (savedSearch.length > 0) {
        localStorage.setItem(lastSearchName, lastSearch);
        localStorage.setItem(savedSearchesName, JSON.stringify(savedSearch))
    }
}
//display search
function searchDisplay() {
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

function cityInfo(cityName){
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
            setSavedSearch(); 
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

function weatherDisplay() {
    const htmlH2 = '<h2 class="card-title">';
    const htmlImg = '<img src="';
    const htmlAlt = '" alt="';
    const htmlAltEnd = '">';
    const htmlH2end = '</h2>';
    const html1 = '<div class="col mb-2"> ' + 
        '<div class="card text-white bg-primary"> ' +
        '<div class="card-body px-2" id="forecast';
    const html2 = '"> </div> </div> </div>';
    const htmlH5 = '<h5 class="card-title">';
    const htmlH5end = '</h5>';
    const htmlP = '<p class="card-text">';
    const htmlPend = '</p>';
    const htmlSpan = '<span class="p-2 rounded text-white ';
    const htmlSpanEnd = '"</span>';

    // UV index
    function getUVcolor(uvi) {
        var backgroundColor = ""; 
        if (!(Number.isNaN(uvi))) {
            if (uvi < 4) {
                backgroundColor = "bg-success";
            }
            else if (uvi < 8) {
                backgroundColor = "bg-warning";
            }
            else {
                backgroundColor = "bg-danger";
            }
        }
        return backgroundColor;
    }

    if ((lastSearch !== null) && (lastSearch>=0) && (lastSearch<savedSearch.length)) {
        var openWeatherURL = openWeatherEnd + openWeather1 + savedSearch[lastSearch].lat + 
            openWeather2 + savedSearch[lastSearch].lon + openWeather3 + APIkey;

        $.ajax({
            url: openWeatherURL,
            method: "GET"
        }).then(function (response) {
            var weatherDiv = $("#weather-data"); 
            var forecastDiv = $("#forecast-data"); 
            var infoDate = (new Date(response.current.dt * 1000)).toLocaleDateString();
            var weatherTitle = savedSearch[lastSearch].name + " (" + infoDate + ") ";
            var imgURL = "http://openweathermap.org/img/wn/" + response.current.weather[0].icon + ".png";
            var imgDesc = response.current.weather[0].description;

            weatherDiv.empty();
            weatherDiv.append(htmlH2 + weatherTitle + htmlImg + imgURL + htmlAlt + imgDesc + htmlAltEnd + htmlH2end);
            weatherDiv.append(htmlP + "Temperature: " + response.current.temp + "\xB0 F" + htmlPend);
            weatherDiv.append(htmlP + "Humidity: " + response.current.humidity + "%" + htmlPend);
            weatherDiv.append(htmlP + "Wind Speed: " + response.current.wind_speed + " MPH" + htmlPend);
            weatherDiv.append(htmlP + "UV Index: " + htmlSpan + getUVcolor(response.current.uvi) + htmlSpanEnd + response.current.uvi + htmlPend);

            forecastDiv.empty();
            for (let i=0; i<5; i++) {
                forecastDiv.append(html1 + i + html2); 
                infoDate = (new Date(response.daily[i].dt * 1000)).toLocaleDateString();
                imgURL = "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + ".png";
                imgDesc = response.daily[i].weather[0].description;
                
                $("#forecast" + i).append(htmlH5 + infoDate + htmlH5end +
                    htmlP + htmlImg + imgURL + htmlAlt + imgDesc + htmlAltEnd + htmlPend +
                    htmlP + "Temp: " + response.daily[i].temp.day + "\xB0 F" + htmlPend +
                    htmlP + "Humidity: " + response.daily[i].humidity + "%" + htmlPend);
            }
        }).catch(function (error) {
            $("#errorMsg").text("Sorry, cannot retrieve weather information. Please try again later.");
            $(".modal").modal('show');
        });

        $("#city-column").css("visibility", "visible"); 
    }
}

function doSearch(event){
    event.preventDefault();
    event.preventDefault();                                     
    var citySearchInput = $("#cityInput");
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