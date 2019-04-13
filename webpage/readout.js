// set html in page
var currentLoc = document.getElementById("current-location");
var pollutionReadout = document.getElementById("readout");

var currentLat = 0;
var currentLon = 0;

var data;

// make request, get data
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setLocation);
}
else {
    currentLoc.innerHTML = "Location not found";
}

function setLocation(position) {
    currentLoc.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    currentLat = position.coords.latitude;
    currentLon = position.coords.longitude;
    getPollutionData();
}

function getAPIKey() {
    return '65797113bb1949db8feffa9ea6f4d227'
}

function getPollutionData() {
    var xmlhttp = new XMLHttpRequest();
    var requestURL = "https://api.breezometer.com/baqi/?lat="+currentLat+"&lon="+currentLon+"&key="+getAPIKey();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            createReadout(myArr);
        }
    };
    xmlhttp.open("GET", requestURL, true);
    xmlhttp.send();
}

function createTable(arr, categories) {
    var out = "<table><tr><th>Pollutant</th><th>Reading</th></tr>";
    for (var i=0; i<categories.length; i++) {
        out+="<tr>";
        out+="<td>"+arr[categories[i]]['pollutant_description']+"</td>";
        out+="<td>"+arr[categories[i]]['concentration']+arr[categories[i]]['units']+"</td>"
        out+="</tr>";
    }
    out+="</table>";
    return out;
}

function createReadout(arr) {
    data = arr;
    var pollutants = arr['pollutants'];

    pollutionReadout.innerHTML = createTable(pollutants, ['co','no2','o3','pm10','pm25','so2']);
}