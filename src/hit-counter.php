<?php
$filename = 'hit-counter.txt';
$handle = fopen($filename, 'r');
$hits = trim(fgets($handle)) + 1;
fclose($handle);

$handle = fopen($filename, 'w');
fwrite($handle, $hits);
fclose($handle);

echo $hits;
?>