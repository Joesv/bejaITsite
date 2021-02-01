'use strict'

// initialize Leaflet
const map = L.map('map').setView({lon: 5, lat: 52}, 8);
let markers = [];
let xml;

// add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);

// show the scale bar on the lower left corner
L.control.scale().addTo(map);
/*
map.on('moveend', updateMarkers);

// show a marker on the map
fetch('getAllStations.php')
    .then(response => response.text())
    .then(data => {
        let parser = new DOMParser();
        xml = parser.parseFromString(data, "text/xml");
        const length = xml.getElementsByTagName("STATION").length;
        for( let i = 0; i < length; i++){
            const lat = xml.getElementsByTagName("LAT")[i].childNodes[0].nodeValue;
            const long = xml.getElementsByTagName("LONG")[i].childNodes[0].nodeValue;
            //console.log({lat, long})
            markers.push(new L.marker({lon: long, lat: lat}).on('click', onMarkerClick)); //marker aan de markers toevoegen
        }
        updateMarkers();

    });
function updateMarkers(){
    const bounds = map.getBounds();
    const zoomLevel = map.getZoom();
    let visibleCount = 0;
    //console.log(markers)
    for (let i = 0; i < markers.length; i++) {
        const marker = markers[i];
        const visib = bounds.contains(marker.getLatLng());
        if (visib && zoomLevel >6) {
            map.addLayer(marker);
            visibleCount++;
        } else {
            map.removeLayer(marker);
        }
    }
    console.log(visibleCount + " van de " + markers.length);
}

function onMarkerClick(event){
    const latlng = event.latlng;
    const lat = latlng.lat;
    const long = latlng.lng;
    const length = xml.getElementsByTagName("STATION").length;
    console.log(latlng);

    for(let i = 0; i < length; i++){
        const stationLat = xml.getElementsByTagName("LAT")[i].childNodes[0].nodeValue;
        //console.log(stationLat);
        const stationLong = xml.getElementsByTagName("LONG")[i].childNodes[0].nodeValue;

        if(lat === stationLat && long  === stationLong){
            const name = xml.getElementsByTagName("NAME")[i].childNodes[0].nodeValue;
            const stn = xml.getElementsByTagName("STN")[i].childNodes[0].nodeValue;
            console.log({stn, name});
            //alert(name)
            i = length;
            bindButtonToModal("dataModal", "close")
            openModal("dataModal");

        }
    }

}*/

const modal = document.getElementById("dataModal");
const button = document.getElementById("close");

button.onclick = function(){modal.style.display = "none"}

modal.style.display = "block";