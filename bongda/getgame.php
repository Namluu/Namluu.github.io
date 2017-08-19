<?php
//http://sportstream365.com/LiveFeed/GetGame?lng=vi&id=72786975&partner=24&_=1458751270218
$file = file_get_contents('http://sportstream365.com/LiveFeed/GetGame?lng=vi&partner=24&id='.$_GET['id']);
echo $file;
?>