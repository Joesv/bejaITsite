<?php

function redirectIfNotLoggedIn(){
    if(isNotLoggedIn()){
        header("location: login.php");
        exit;
    }
}

function isNotLoggedIn(){
    if(session_status() == PHP_SESSION_NONE) { //start de sessiosn als het nog niet gestart is
        session_start();
    }
    if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
        return true;
    }
}

function isLoggedIn(){
    return !isNotLoggedIn();
}