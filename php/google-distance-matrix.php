<?php
 header("Access-Control-Allow-Origin: *");
$urlBase = "https://maps.googleapis.com/maps/api/distancematrix/json";
$key = "AIzaSyCqntUVlqJNwvQLZrdO_w2G2Vb-fK6hIbo";

$url = $urlBase . "?key=" . $key;

foreach($_GET as $key => $value)
{
    $url = $url . "&" . $key . "=" . $value;
}

$contents = file_get_contents($url);

print($contents);

?>