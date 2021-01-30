<?php
require_once("includes/header.php");
require_once("includes/functions.php");

//redirectIfNotLoggedIn();
?>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
        <link rel="stylesheet" href="css/main.css">
    </head>
    <body>
<div id="map"></div>

<script src="js/map.js"></script> <!-- zorg ervoor dat dit zo ver mogelijk onderaan staat -->
<?php
include_once("includes/footer.php");
include_once("includes/bodyend.php");
