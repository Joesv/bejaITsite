<?php
$title = "snow";
require_once("includes/header.php");
require_once("includes/menu.php");
require_once("includes/functions.php");
require_once("generateXML.php");
redirectIfNotLoggedIn();

?>
<!-- sneeuw -->
<div class="center snow" >
    <table class="snowdata">
        <thead>
            <tr>
                <th>STN</th>
                <th>Name</th>
                <th>Fallen snow</th>
            </tr>
        </thead>
        <tbody>
        <?php
            $data = getStationsWithSnow();
            foreach($data as $row){
                echo <<< EOD
<tr>
    <td>{$row['stn']}</td>
    <td>{$row['name']}</td>
    <td>{$row['sndp']}</td>
</tr>
EOD;

            }

        ?>
        </tbody>
    </table>
</div>
<?php
require_once("includes/footer.php");
