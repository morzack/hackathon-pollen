// set html in page
var currentLoc = document.getElementById("current-location");
var pollutionReadout = document.getElementById("readout");
var warningReadout = document.getElementById("warnings");

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
    loadGeoData
    getPollutionData();
}

function getAPIKey() {
    return '65797113bb1949db8feffa9ea6f4d227'
}

function getPollutionData() {
    var xmlhttp = new XMLHttpRequest();
    // next lines will override location to kanpur india for extra pollution
    // currentLat=26.4471566;
    // currentLon=80.268343;
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
    var out = "<table align=\"center\"><tr><th>Pollutant</th><th>Reading</th></tr>";
    for (var i=0; i<categories.length; i++) {
        out+="<tr>";
        out+="<td>"+arr[categories[i]]['pollutant_description']+"</td>";
        out+="<td>"+arr[categories[i]]['concentration']+arr[categories[i]]['units']+"</td>"
        out+="</tr>";
    }
    out+="</table>";
    return out;
}

function makeBulleted(i) {
    return "<li>" + i + "</li>";
}

function createWarningItem(item, concentration, low, medium, high) {
    concentration*=2;
    if (concentration>=low && concentration<medium) {
        return "<div class='low'>Low levels of "+item+"</div>";
    }
    else if (concentration>=medium && concentration<high) {
        return "<div class='moderate'>Moderate levels of "+item+", be wary"+"</div>";
    }
    else if (concentration>=high) {
        return "<div class='extreme'>High levels of "+item+", try to avoid prolonged exposure to outside air!"+"</div>";
    }
    else {
        return "<div class='none'>No warnings for "+item+" today."+"</div>";
    }
}

function createWarnings(arr) {
    var out = "<ul>";
    var co = arr['co']['concentration']/1000;
    out+=makeBulleted(createWarningItem("carbon monoxide", co, 15, 35, 70));
    var so2 = arr['so2']['concentration'];
    out+=makeBulleted(createWarningItem("sulfur dioxide", so2, 35, 75, 186));
    var o3 = arr['o3']['concentration'];
    out+=makeBulleted(createWarningItem("ozone", o3, 55, 70, 105));
    var pm10 = arr['pm10']['concentration'];
    out+=makeBulleted(createWarningItem("inhalable particles", pm10, 54, 255, 425));
    var no2 = arr['no2']['concentration'];
    out+=makeBulleted(createWarningItem("nitrogen dioxide", no2, 53, 361, 1250));
    out+="</ul>";
    return out;
}

function loadGeoData() {
    var commentForm = document.getElementById("commentForm");
    document.forms["commentForm"].lat.value = currentLat;
    document.forms["commentForm"].lon.value = currentLon;
}

function createReadout(arr) {
    data = arr;
    var pollutants = arr['pollutants'];
    pollutionReadout.innerHTML = createTable(pollutants, ['co','no2','o3','pm10','pm25','so2']);
    warningReadout.innerHTML = createWarnings(pollutants);
}