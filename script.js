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
//section for city api
function citySaved(){
    var searchList = JSON.parse(localStorage.getItem(savedSearchesName));
    lastSearchIndex = localStorage.getItem(lastSearchName);
    
        // If valid list returned, set global variable to it
        if (searchList) {
            savedSearches = searchList;
            displaySavedSearches(); // Load displayed city list
            displayWeatherData(); // Display last viewed city
        }
    }
}

//section for 5 day forcast


//Section for Search
function 

//Section for Search History
function cityList(){

}