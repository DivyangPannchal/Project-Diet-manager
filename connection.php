<?php
// Retrieve database connection details from environment variables (common on Render)
// Or fallback to local PostgreSQL defaults
$host = getenv('DB_HOST') ?: 'localhost';
$port = getenv('DB_PORT') ?: '5432';
$dbname = getenv('DB_NAME') ?: 'tdm_db';
$user = getenv('DB_USER') ?: 'postgres';
$password = getenv('DB_PASS') ?: 'root';

// If Render provides a DATABASE_URL, parse it automatically:
$dbUrl = getenv('DATABASE_URL');
if ($dbUrl) {
    $dbopts = parse_url($dbUrl);
    $host = $dbopts["host"] ?? $host;
    $port = $dbopts["port"] ?? $port;
    $user = $dbopts["user"] ?? $user;
    $password = $dbopts["pass"] ?? $password;
    $dbname = isset($dbopts["path"]) ? ltrim($dbopts["path"], '/') : $dbname;
}

try {
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname";
    $pdo = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
}
catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>
