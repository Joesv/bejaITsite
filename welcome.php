<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
?>
<!--
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <style>
        body {
            margin: 0;
        }

        /* Style the header */
        .header {
            background-color: #f1f1f1;
            padding: 1px;
            text-align: left;
        }

        .center {
            margin: auto;
            width: 50%;
            padding: 10px;
        }
    </style>
</head>
<body>

<br/>Welcome to our site.</h1>
<div class="header"  style="background-color:#78a22f;">
    <p>
    <h1><a href="welcome.php"><img src=https://www.kathmandu.co.nz/static/version1611282755/frontend/Kathmandu/default/en_NZ/images/logo.svg alt="Kathmandu Logo" height="30"></a></h1>
</div>

-->
<?php

$title = "Welcome";
require_once("includes/header.php");
require_once("includes/menu.php");
?>

<div class="center">
    <h1 class = "center">Hi, <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>.
        <br/>Welcome to Kathmandu.</h1>
    <p class = "center">
        <a href="reset-password.php" class="btn btn-warning">Reset Your Password</a>
        <a href="reset-password.php" class="btn btn-warning">Reset Your Password</a>
        <a href="logout.php" class="btn btn-danger">Sign Out of Your Account</a>
        <a href="logout.php" class="btn btn-danger">Sign Out of Your Account</a>
    </p>
    </p>
</div>
</body>
</html>