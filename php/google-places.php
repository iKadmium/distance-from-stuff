<?php
 header("Access-Control-Allow-Origin: *");
$urlBase = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
$key = "AIzaSyAnePGuikyu85CewhP7dTqn2NwwrkEFBic";

$url = $urlBase . "?key=" . $key;

foreach($_GET as $key => $value)
{
    $url = $url . "&" . $key . "=" . urlencode($value);
}

$contents = file_get_contents($url);

print($contents);

?>