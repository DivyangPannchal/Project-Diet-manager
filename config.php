<?php
// Groq API Configuration
// For security (especially on GitHub), we use environment variables.
// On Render, add 'GROQ_API_KEY' to your environment variables.
// For local testing, you can use putenv('GROQ_API_KEY=your_key_here') or set it in your system.

define('GROQ_API_KEY', getenv('GROQ_API_KEY'));
define('GROQ_MODEL', 'llama-3.1-8b-instant');
define('GROQ_API_URL', 'https://api.groq.com/openai/v1/chat/completions');
?>
