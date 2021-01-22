<?php
$mysqldata = array('username'=>'bejait', 'password'=>'topkek123', 'host'=>'localhost', 'database'=>'bejait');

$con = mysqli_connect($mysqldata['host'], $mysqldata['username'], $mysqldata['password'], $mysqldata['database']);

if(mysqli_connect_errno()){
    echo mysqli_connect_error();
    exit;
}


