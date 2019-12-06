<?php
$start = microtime(true);
$x = $_GET['x'];
$y = $_GET['y'];
$r = $_GET['r'];


if (($x <= 0) && ($y <= 0) && ($x >= (-$r/2)) &&($y >= (-$r))) {
    $time = microtime(true) - $start;
    echo "Попадание ".$time;
}
else if (($x <= 0) && ($y >= 0) && ($y <= ($x + $r/2))) {
    $time = microtime(true) - $start;
    echo "Попадание ".$time;
}
else if (($x >= 0) && ($y <= 0)){
    $time = microtime(true) - $start;
    $d = sqrt(pow(($r/2-$x),2) + pow(($r/2-abs($y)),2));
    if ($d <= $r/2) {
        echo "Попадание ".$time;
    }
    else {
        echo "Промах ".$time;
    }
}
else {
    $time = microtime(true) - $start;
    echo "Промах ".$time;
}
