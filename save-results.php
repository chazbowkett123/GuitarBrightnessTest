<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$timestamp = date('Y-m-d H:i:s');
$csvFile = 'data/test_results.csv';

// Create headers if file doesn't exist
if (!file_exists($csvFile)) {
    $headers = array('Timestamp', 'Set', 'Sample', 'Rank', 'AudioFile');
    $fp = fopen($csvFile, 'w');
    fputcsv($fp, $headers);
    fclose($fp);
}

// Append new results
$fp = fopen($csvFile, 'a');
foreach ($data as $setName => $rankings) {
    foreach ($rankings as $ranking) {
        $row = array(
            $timestamp,
            $setName,
            $ranking['sampleId'],
            $ranking['rank'],
            $ranking['audioFile']
        );
        fputcsv($fp, $row);
    }
}
fclose($fp);

echo json_encode(['success' => true]);
?>
