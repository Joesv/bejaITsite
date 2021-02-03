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
    console.log("hello")
    const latlng = event.latlng;
    const lat = latlng.lat;
    const long = latlng.lng;

    const length = xml.getElementsByTagName("STATION").length;
    for(let i = 0; i < length; i++){ //loop through the XML
        const stationLat = xml.getElementsByTagName("LAT")[i].childNodes[0].nodeValue;
        const stationLong = xml.getElementsByTagName("LONG")[i].childNodes[0].nodeValue;
        if(lat == stationLat && long  == stationLong){
            console.log("hello world!")
            let name = xml.getElementsByTagName("NAME")[i].childNodes[0].nodeValue;
            let stn = xml.getElementsByTagName("STN")[i].childNodes[0].nodeValue;
            modal.style.display = 'block';
            modelHeader.innerHTML = "Weather";
            i = length;
            const data = generateData();
            //drawGraph('chart',data, 400, 400 );
            getData(stn)

        }
    }
}

function getData(stn){
    fetch("getStationData.php?station="+stn)
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            let stationData = parser.parseFromString(data, "text/xml")
            const downloadLink = document.getElementById("downloadLink");
            const length = stationData.getElementsByTagName("MEASUREMENT").length;
            if(length === 0){ // if there are no records found show it on the page
                document.getElementsByClassName("modal-body")[0].style.display = "none";
                document.getElementsByClassName("error")[0].style.display = "block";
                document.getElementById("downloadLink").style.display = "none";
            } else {
                document.getElementsByClassName("modal-body")[0].style.display = "block";
                document.getElementsByClassName("error")[0].style.display = "none";
                downloadLink.style.display = "inline";
                downloadLink.href="getStationData.php?station="+stn +"&file=true";
                let dewp = [];
                let visib = [];
                let wdsp = [];
                let stp = [];
                let prcp = [];
                let temp = [];
                let time = [];
                let date = [];
                let winddir;
                let frshtt;
                for (let i = 0; i < length; i++) {
                    dewp.push(stationData.getElementsByTagName("DEWP")[i].childNodes[0].nodeValue);
                    visib.push(stationData.getElementsByTagName("VISIB")[i].childNodes[0].nodeValue);
                    wdsp.push(stationData.getElementsByTagName("WDSP")[i].childNodes[0].nodeValue);
                    prcp.push(stationData.getElementsByTagName("PRCP")[i].childNodes[0].nodeValue);
                    winddir = stationData.getElementsByTagName("WNDDIR")[i].childNodes[0].nodeValue;
                    temp.push(stationData.getElementsByTagName("TEMP")[i].childNodes[0].nodeValue);
                    time.push(stationData.getElementsByTagName("TIME")[i].childNodes[0].nodeValue);
                    date.push(stationData.getElementsByTagName("DATE")[i].childNodes[0].nodeValue);
                    stp.push(stationData.getElementsByTagName("STP")[i].childNodes[0].nodeValue);
                    frshtt = stationData.getElementsByTagName("FRSHTT")[i].childNodes[0].nodeValue;


                }
                modal.innerHTML  += "<a href='getStationData.php?station="+ stn+ "&file=true' target='_blank'>Download</a>";


                drawDirectionArrow("wind", 200, 200, parseInt(winddir));

                let tbody = document.getElementById("tbody");
                let tempData = document.getElementById("tempData");
                let otherData = document.getElementById("otherdata");

                otherData.innerHTML = "";
                tempData.innerHTML = "";
                tbody.innerHTML = "";

                let startAt = 0;
                if(length > 10) {
                    startAt = length - 10;
                }

                for(let i = startAt; i < length; i++){
                    let html = "<tr>";
                    html += "<td>" + dewp[i] + "</td>";
                    html += "<td>" + stp[i] + "</td>";
                    html += "<td>" + visib[i] + "</td>";
                    html += "<td>" + wdsp[i] + "</td>";
                    html += "<td>" + prcp[i] + "</td>";
                    html += "</tr>";
                    tbody.innerHTML+=html;

                    html = "<tr>";
                    html += "<td>" + date[i] + "</td>";
                    html += "<td>" + time[i] + "</td>";
                    html += "<td>" + temp[i] + "</td>";
                    html += "</tr>";
                    tempData.innerHTML += html;
                }

                let html = "<p>";
                let string = frshtt.split("");
                if(string[0] === "1"){
                    html+="It has been freezing";
                } else {
                    html+="It has not been freezing";
                }
                html+="<br>";
                if(string[1] === "1"){
                    html+="It has been raining";
                } else {
                    html+="It has not been raining";
                }
                html+="<br>";
                if(string[2] === "1"){
                    html+="It has been snowing";
                } else {
                    html+="It has not been snowing";
                }
                html+="<br>";
                if(string[3] === "1"){
                    html+="There has been hail";
                } else {
                    html+= "There has been no hail";
                }
                html+="<br>";
                if(string[4] === "1"){
                    html+="There has been thunder";
                } else {
                    html+="There has been no thunder";
                }
                html+="<br>";
                if(string[5] === "1"){
                    html+="There has been a tornado";
                } else {
                    html+="There has been no tornado";
                }
                html+="<br></p>";
                otherData.innerHTML = html;





            }

        })

}