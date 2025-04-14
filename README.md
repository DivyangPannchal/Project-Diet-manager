# Project Overview

This project is a web application that includes features such as a chatbot, BMI calculator, diet tips, and a to-do list, basically as a Diet and nutrition manager

## Features
- **Chatbot**: Interact with an AI-powered chatbot.
- **BMI Calculator**: Calculate your Body Mass Index.
- **Diet Tips**: Get useful diet tips.
- **To-Do List**: Manage your tasks efficiently.

## Technologies Used
- HTML
- CSS
- JavaScript
- PHP

## Setup Instructions

### Prerequisites
- XAMPP or similar local server environment

### Installation
1. Clone the repository:
2. Move the cloned files to your XAMPP `htdocs` directory.

### Running the Application
1. Start the Apache server from XAMPP Control Panel.
2. Open your browser and navigate to `http://localhost/project`.

### Adding an API Key
1. Add your API key in the following format in ask_bot.php:
   ```
   API_KEY=your_api_key_here
   ```

### Uploading SQL Files to phpMyAdmin
1. Open phpMyAdmin from your XAMPP Control Panel.
2. Select the database you want to import the tables into.
3. Click on the 'Import' tab.
4. Choose the `diet_db.sql` file and click 'Go' to import the diet database.
5. Repeat the process for the `todo.sql` file to import the to-do list database.

### Contribution
Feel free to fork the repository and submit pull requests. Contributions are welcome!