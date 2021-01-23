<?php
require_once('db.php');
$limit = 100; // limiet van de SQL select statement, wordt niet gebruikt bij


function getStationData(int $id):array{
    global $limit;
    global $conn;

    $sql = "SELECT * FROM measurements WHERE stn = ? LIMIT " . $limit;
        if($stmt = mysqli_prepare($conn, $sql)) { //maak een prepared statement aan
            mysqli_stmt_bind_param($stmt, 'i', $id); //bind de id aan de sql. Op deze manier krijg je geen SQL injecties.
            mysqli_stmt_execute($stmt);

            //mysqli_stmt_bind_result($stmt, $result);
            $result = mysqli_stmt_get_result($stmt);
            //echo mysqli_num_rows($result);
            $results = [];
            while($data = mysqli_fetch_assoc($result)){
                array_push($results, $data);
            }

            mysqli_free_result($result);
            return $results;
        }
}

function getAllData():array{
    global $limit;
    global $conn;

    $sql = "SELECT * FROM measurements LIMIT " . $limit;
    if($stmt = mysqli_prepare($conn, $sql)) { //maak een prepared statement aan
        mysqli_stmt_execute($stmt);

        //mysqli_stmt_bind_result($stmt, $result);
        $result = mysqli_stmt_get_result($stmt);
        //echo mysqli_num_rows($result);
        $results = [];
        while($data = mysqli_fetch_assoc($result)){
            array_push($results, $data);
        }

        mysqli_free_result($result);
        return $results;

    }
}

function getAllStations():array {
    global $limit;
    global $conn;
    $sql = "SELECT * FROM stations";//" LIMIT ".$limit;
    if($stmt = mysqli_prepare($conn, $sql)){
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $results = [];
        while($data = mysqli_fetch_assoc($result)){
            array_push($results, $data);
        }
        mysqli_free_result($result);
        return $results;
    }
}


function generateEntryStationDataTable(array $row):string {
    $FRSHTT = '';
    $FRSHTT .= $row['freezing'] ? '1' : '0';
    $FRSHTT .= $row['raining'] ? '1' : '0';
    $FRSHTT .= $row['snowing'] ? '1' : '0';
    $FRSHTT .= $row['hail'] ? '1' : '0';
    $FRSHTT .= $row['thunder'] ? '1' : '0';
    $FRSHTT .= $row['tornado'] ? '1' : '0';
    return <<<EOT
	<MEASUREMENT>
		<STN>{$row['stn']}</STN>
		<DATE>{$row['date']}</DATE>
		<TIME>15:59:46</TIME>
		<TEMP>{$row['temp']}</TEMP>
		<DEWP>{$row['dewp']}</DEWP>
		<STP>{$row['stp']}</STP>
		<SLP>{$row['slp']}</SLP>
		<VISIB>{$row['visib']}</VISIB>
		<WDSP>{$row['wdsp']}</WDSP>
		<PRCP>{$row['prcp']}</PRCP>
		<SNDP>{$row['sndp']}</SNDP>
		<FRSHTT>{$FRSHTT}</FRSHTT>
		<CLDC>{$row['cldc']}</CLDC>
		<WNDDIR>{$row['winddir']}</WNDDIR>
	</MEASUREMENT>

EOT;
}

function generateStationXML(array $data):string {
    if(count($data) > 0) {
        $result = "<?xml version=\"1.0\"?>\n<WEATHERDATA>";
        foreach($data as $row){
            $result  = $result . generateEntryStationDataTable($row);
        }
        return $result . '</WEATHERDATA>';

    } else {
        return "<ERROR>NO RESULT</ERROR>";
    }
}

function generateStationsRow(array $row):string {
    return <<<EOT
    <STATION>
        <STN>{$row['stn']}</STN>
        <NAME>{$row['name']}</NAME>
        <COUNTRY>{$row['country']}</COUNTRY>
        <LAT>{$row['latitude']}</LAT>
        <LONG>{$row['longitude']}</LONG>
        <ELEVATION>{$row['elevation']}</ELEVATION>
    </STATION>
EOT;

}

function generateAllStationsXNML(array $data):string {
    if(count($data) > 0) {
        $result = "<?xml version=\"1.0\"?>\n<STATIONDATA>";
        foreach ($data as $row) {
            $result = $result . generateStationsRow($row);
        }
        return $result . '</STATIONDATA>';
    }
}
