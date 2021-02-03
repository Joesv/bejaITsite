<?php
//require_once("includes/header.php");
require_once("includes/functions.php");

redirectIfNotLoggedIn();
?>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>Map</title>
        <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/modal.css">
    </head>
    <body>
<?php require_once("includes/menu.php") ?>
<div id="map"></div>


<div class="modal" id="dataModal">
    <div class="modal-content">
        <div class="modal-header">
            <span id="close">&times;</span>
            <h2 class="model-h2">Weather</h2>
        </div>
        <div class="modal-body">
            <a target="_blank" id="downloadLink">Download</a>
            <!-- <canvas id="chart"></canvas>-->
            <table id="temptable">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Temp</th>
                </tr>
                </thead>
                <tbody id="tempData"></tbody>
            </table>
            <canvas id="wind"></canvas>
            <table id="tableData">
                <thead>
                <tr>
                    <th>DEWP</th>
                    <th>STP</th>
                    <th>VISIB</th>
                    <th>WDSP</th>
                    <th>PRCP</th>
                </tr>
                </thead>
                <tbody id="tbody"></tbody>
            </table>
            <div id="otherdata"></div>
        </div>

        <div class="error"><p>no records found</p></div>
    </div>
</div>
<script src="js/chart.js"></script>
<script src="js/wind.js"></script>
<script src="js/map.js"></script> <!-- make sure it's last-->
<?php
include_once("includes/footer.php");
include_once("includes/bodyend.php");
