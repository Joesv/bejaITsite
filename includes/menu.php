<!-- menu  -->
<div class="header">
    <a href="welcome.php"><img src="img/Kathmandu-Logo.jpg" alt="Kathmandu Logo" height="40"></a>
    <?php
    require_once("includes/functions.php");
    if(isLoggedIn()){
        echo <<< EOD
<div class="logout">
    <div>
        <p>Hi {$_SESSION["username"]}</p>
    </div>
    <div>
        <p><a href="map.php">Map</a></p>
    </div>
    <div>
        <p><a href="snow.php">Snow Precipitation</a></p>
    </div>
    <div>
        <p><a href="logout.php">Logout</a></p>
    </div>
</div>
EOD;

    }
    ?>
</div>