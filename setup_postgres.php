<?php
// Unified PostgreSQL Setup for Render

require_once 'connection.php';

echo "Connected successfully to PostgreSQL server.\n";

function execute_sql_content($pdo, $sql) {
    try {
        $pdo->exec($sql);
        echo "Successfully executed SQL block.\n";
    } catch (PDOException $e) {
        echo "Error executing SQL: " . $e->getMessage() . "\n";
    }
}

// Read consolidated init.sql
$init_sql = file_get_contents('init.sql');

if ($init_sql) {
    echo "Initializing database schema...\n";
    execute_sql_content($pdo, $init_sql);
} else {
    echo "Error: init.sql not found or empty.\n";
}

echo "Database initialization complete.\n";
?>
