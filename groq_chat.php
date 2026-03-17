<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$userMessage = isset($input['message']) ? trim($input['message']) : '';

if (empty($userMessage)) {
    http_response_code(400);
    echo json_encode(['error' => 'No message provided']);
    exit;
}

$systemPrompt = "You are NutriBot, an advanced AI nutrition and diet assistant integrated into TDM (Transform Diet Management). You are knowledgeable, friendly, and concise. You specialize in:
- Personalized diet planning and meal suggestions
- BMI analysis and healthy weight guidance
- Nutritional information about foods and macros
- Healthy eating habits and lifestyle tips
- Diet tips for specific goals (weight loss, muscle gain, energy)
Keep your responses helpful, evidence-based, and easy to understand. Format responses clearly. If asked about something outside nutrition/diet/health, gently guide the conversation back to your area of expertise.";

$payload = json_encode([
    'model'    => GROQ_MODEL,
    'messages' => [
        ['role' => 'system', 'content' => $systemPrompt],
        ['role' => 'user',   'content' => $userMessage]
    ],
    'max_tokens'  => 1024,
    'temperature' => 0.7,
]);

$ch = curl_init(GROQ_API_URL);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . GROQ_API_KEY,
    ],
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => false,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(500);
    echo json_encode(['error' => 'Connection error: ' . $curlError]);
    exit;
}

$data = json_decode($response, true);

if ($httpCode !== 200 || !isset($data['choices'][0]['message']['content'])) {
    http_response_code(500);
    $errMsg = isset($data['error']['message']) ? $data['error']['message'] : 'Unknown API error';
    echo json_encode(['error' => $errMsg]);
    exit;
}

echo json_encode([
    'reply' => $data['choices'][0]['message']['content'],
    'model' => $data['model'] ?? GROQ_MODEL,
]);
