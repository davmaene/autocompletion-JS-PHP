<?php
    $data = unserialize(file_get_contents('towns.txt')); 
    $dataLen = count($data);
    sort($data); 
    $results = array(); 
    for ($i = 0 ; $i < $dataLen && count($results) < 10 ; $i++)
    {
        if (stripos($data[$i], $_GET['s']) === 0) { 
            array_push($results, $data[$i]); 
        }
    }
    echo implode('|', $results);
?>