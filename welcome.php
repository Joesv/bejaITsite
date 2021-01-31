<?php
include_once('header.php');
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
<title>Welcome</title>
<meta charset="UTF-8">
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="center"> 
        <h1 class = "center">Hi, <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>. 
        <br/>Welcome to Kathmandu.</h1>
    <p class = "center">
        <a href="reset-password.php" class="btn btn-warning">Reset Your Password</a>
        <a href="logout.php" class="btn btn-danger">Sign Out of Your Account</a>
    </p>
  </div>
</body>
</html>