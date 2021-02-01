'use strict'
/*
let map;
let canvas = document.getElementById("map");
let height = canvas.height  = 480;
let width = canvas.width = 640;
let xml;
let ctx = canvas.getContext('2d');
const options = {
    lat: 0,
    lng: 0,
    zoom: 4,
    style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
};


const mappa = new Mappa("Leaflet");


map = mappa.tileMap(options);
map.overlay(canvas);

fetch('getAllStations.php')
    .then(response => response.text())
    .then(data => {
        let parser = new DOMParser();
        xml = parser.parseFromString(data, "text/xml");
        console.log(xml);
        map.onChange(drawWeatherStations);

    });

function drawWeatherStations(){
    ctx.clearRect(0,0, width,height);
    /*
    const length = xml.getElementsByTagName("STATION").length;
    console.log(length)
    for( let i = 0; i < length; i++){
        const lat = xml.getElementsByTagName("LAT")[i].childNodes[0].nodeValue;
        const long = xml.getElementsByTagName("LONG")[i].childNodes[0].nodeValue;
        //console.log({lat, long})
        if(map.map.getBounds().contains({lat: lat, lng: long})) {
            console.log("hello")
            const pos = map.latLngToPixel(lat, long);
            const size = 3;
            ctx.arc(pos.x, pos.y, size, 0 , 2 * Math.PI);
        }
    }*
    ctx.fillStyle = "#F0F";
    ctx.arc(30,200,1000,0,2*Math.PI)
    ctx.fillStyle = "#F0F";
   ctx.fillRect(50,50, 100, 100);
}*/
let xml;


var map = L.map('map').setView({lon: 0, lat: 0}, 2);

// add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);

// show the scale bar on the lower left corner
L.control.scale().addTo(map);

// show a marker on the map
//L.marker({lon: 0, lat: 0}).bindPopup('The center of the world').addTo(map);


/*const mymap = L.map('mapid').setView([0,0], 6);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 256,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);
/*

fetch('getAllStations.php')
    .then(response => response.text())
    .then(data => {
        let parser = new DOMParser();
        xml = parser.parseFromString(data, "text/xml");
        console.log(xml);

        const length = xml.getElementsByTagName("STATION").length;
        console.log(length)
        for( let i = 0; i < length; i++) {
            const lat = xml.getElementsByTagName("LAT")[i].childNodes[0].nodeValue;
            const long = xml.getElementsByTagName("LONG")[i].childNodes[0].nodeValue;
            L.marker([lat, long]).addTo(mymap);
        }
    });
*/