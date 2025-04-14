<?php
header('Content-Type: application/json');

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

$userMessage = $_GET['message'] ?? '';

$apiKey = 'YOUR_API_KEY'; // Replace with your actual Gemini API key

$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$apiKey";

$data = [
    "contents" => [
        [
            "parts" => [
                ["text" => $userMessage]
            ]
        ]
    ]
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // 🚨 Ignore SSL check (only for local dev)
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);


$response = curl_exec($ch);

if(curl_errno($ch)) {
    echo json_encode(["botResponse" => "Curl error: " . curl_error($ch)]);
    exit;
}

curl_close($ch);

// Debug raw response
// echo $response;

$responseData = json_decode($response, true);

$botResponse = $responseData['candidates'][0]['content']['parts'][0]['text'] ?? 'No response or invalid API key';

echo json_encode(['botResponse' => $botResponse]);
