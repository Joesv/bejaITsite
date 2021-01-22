# bejaITsite


### API Endpoints

---

#### Get all Stations 

Endpoint: `/getAllStations.php`

Parameters: none

Returns: XML with all station data

---

#### Get all Station data

Endpoint: `/getStationData.php`

Parameters: 

`file` (boolean) (not required): if true, serve data as downloadable file. Otherwise as normal data stream.

`station` (int) (not required): station id, if not defined it serves all station data.