'use strict'

// initialize Leaflet
const map = L.map('map').setView({lon: 0, lat: 60}, 4);
let markers = [];
let xml; // de xml waar de data van de weather stations in opgeslagen kan worden

/** modal (popup */
const modal = document.getElementById("dataModal");
const modelHeader = document.getElementsByClassName("model-h2")[0];
const modalContent = document.getElementsByClassName("modal-body")[0];
const button = document.getElementById("close");
/** arrow functions om de modal te verbergen wanneer of op het kruisje geklikt wordt of wanneer er buiten de modal geklikt wordt */
modal.onclick = ()=> { modal.style.display = "none" };
button.onclick = ()=> { modal.style.display = "none"};




//https://leafletjs.com/examples/quick-start/
// add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// show the scale bar on the lower left corner
L.control.scale().addTo(map);

/** voeg een listener toe die de markers update wanneer de map verplaatst wordt */
map.on('moveend', updateMarkers);

/** fetch the station data */
fetch('getAllStations.php')
    .then(response => response.text())
    .then(data => {
        let parser = new DOMParser();
        xml = parser.parseFromString(data, "text/xml");
        const length = xml.getElementsByTagName("STATION").length;
        for( let i = 0; i < length; i++){
            const lat = xml.getElementsByTagName("LAT")[i].childNodes[0].nodeValue;
            const long = xml.getElementsByTagName("LONG")[i].childNodes[0].nodeValue;
            markers.push(new L.marker({lon: long, lat: lat}).on('click', onMarkerClick)); //add the marker to the markers
        }
        updateMarkers();

    });

/** Verberg de markers wanneer ze buiten de view zijn, of laat ze zien als ze binnen het scherm vallen */
function updateMarkers(){
    const minZoomLevel = 0; // from which zoomlevel the markers are supposed to be shown.
    const bounds = map.getBounds(); //returns the geographical bounds of the current screen (the lat/long of northeast and southwest)
    const zoomLevel = map.getZoom();
    for (let i = 0; i < markers.length; i++) { //loop through all the markers
        const marker = markers[i];
        const visib = bounds.contains(marker.getLatLng()); //if the marker is in view
        if (visib && zoomLevel > minZoomLevel) {
            map.addLayer(marker);
        } else {
            map.removeLayer(marker); //if its not visible or it's not zoomed in far enough; don't render the marker
        }
    }
}
/** onclick event */
function onMarkerClick(event){
    //event gegevens
    const latlng = event.latlng;
    const lat = latlng.lat;
    const long = latlng.lng;

    const length = xml.getElementsByTagName("STATION").length;
    for(let i = 0; i < length; i++){ //loop through the XML
        const stationLat = xml.getElementsByTagName("LAT")[i].childNodes[0].nodeValue;
        const stationLong = xml.getElementsByTagName("LONG")[i].childNodes[0].nodeValue;
        if(lat == stationLat && long  == stationLong){
            const name = xml.getElementsByTagName("NAME")[i].childNodes[0].nodeValue;
            const stn = xml.getElementsByTagName("STN")[i].childNodes[0].nodeValue;
            modal.style.display = 'block';
            modelHeader.innerHTML = "Weather in "+ name;
            i = length;
            const data = generateData();
            //drawGraph('chart',data, 400, 400 );
            addData(stn)

        }
    }
}

function addData(stn){
    fetch("getStationData.php?station="+stn)
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            xml = parser.parseFromString(data, "text/xml")
            const length = xml.getElementsByTagName("MEASUREMENT").length;
            for(let i = 0; i < length; i++){
                const stn = xml.getElementsByTagName("STN")[i].childNodes[0].nodeValue;
                console.log(stn)
            }
        })

}