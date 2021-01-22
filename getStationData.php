<?php
require_once('generateXML.php');

$file = false;
$station = null;

if(isset($_GET['file'])) {
    $file = $_GET['file'];
    if($file!=true){
        $file = false;
    }

}
if(isset($_GET['station'])) {
    $station = $_GET['station'];
}

if($station != null && $station != false){ //als er een andere waarde dan null en false is gedefinieerd, e.g. een nummer
    $station = intval($station);
    $data = getStationData($station);
} else {
    $data = getAllData();
}
$xml = generateStationXML($data);

header("Content-type: text/xml");
if($file){
    header("Content-Disposition: attachment; filename=data.xml");
}
echo $xml;