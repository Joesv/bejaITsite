<?php
require_once("generateXML.php");

$data = getAllStations();
$xml = generateAllStationsXNML($data);

header('Content-type: text/xml');
echo $xml;