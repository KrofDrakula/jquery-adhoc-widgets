<?php

ob_start();

require_once('Generator.class.php');

header("Content-type", "application/json");

$n = array_key_exists('n', $_REQUEST)? intval($_REQUEST['n'], 10): 10;

$gen = new Generator();

echo json_encode(array("people" => $gen->getRandomNames($n)));

ob_end_flush();