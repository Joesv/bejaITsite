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
    $station = $_GET['file'];
}

if($station != null && $station != false){ //als er een andere waarde dan null en false is gedefinieerd, e.g. een nummer
    $station = intval($station);
    $data = getStationData($station);
} else {
    $data = getAllData();
}
$xml = generateXML($data);


if($file){
    $tempFile = fopen("data.xml", "w") or die("Unable to open file!"); //open een file, als het niet bestaat creeer het. Mocht er al een file zijn dan gaat ie naar het begin van het bestand en begint het met overschrijven.
    fwrite($tempFile, $xml);
    header("X-Sendfile: $tempFile");
    header("Content-type: application/octet-stream");
    header('Content-Disposition: attachment; filename="' . basename($tempFile) . '"');

} else {
    header('Content-Type: text/xml'); //zet de header naar xml ipv html
    echo $xml;
}