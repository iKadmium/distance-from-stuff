<?php
 header("Access-Control-Allow-Origin: *");
$urlBase = "https://maps.googleapis.com/maps/api/geocode/json";
$key = "AIzaSyBvZdPlfS1fbMNwfb6UyCmKs3s1uj27uwA";

$url = $urlBase . "?key=" . $key;

foreach($_GET as $key => $value)
{
    $url = $url . "&" . $key . "=" . urlencode($value);
}

$contents = file_get_contents($url);

print($contents);

?>