// make request, get data
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setLocation);
}
else {
    currentLoc.innerHTML = "Location not found";
}

var currentLat = document.getElementById("latI");
var currentLon = document.getElementById("lonI");

function setLocation(position) {
    currentLat.value = position.coords.latitude;
    currentLon.value = position.coords.longitude;
}
