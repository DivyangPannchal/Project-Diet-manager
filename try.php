<!DOCTYPE html>
<html>
<head>
    <title>TDM</title>
    <link rel="stylesheet" type="text/css" href="todo1.css">
  <style>
    .back{
   color: #fff;
   padding: 10px;
   width:30px;
   margin: top 10px;
   background-color: #4CAF50;
   cursor: pointer;
   margin-top: 20px;
   margin-left:20px;
   z-index: 8px;
   border-radius:10px;
}
body {
      background-image: url('bgimage4.jpg'); 
      background-size: cover;
      background-position: center;
      background-repeat:repeat;
      height: 100%;
      margin: 0;
      font-family: 'Arial', sans-serif; /* Add your preferred font-family */
    }
</style>
    <script>
        function toggleEditForm(index) {
            var editForm = document.getElementById('editForm_' + index);
            if (editForm.style.display === 'none') {
                editForm.style.display = 'block';
            } else {
                editForm.style.display = 'none';
            }
        }
    </script>
</head>
<body>
 
  <headerlink style="display: flex; justify-content: right;">
  <span id="logo" style="margin: 1.6rem 0;cursor: pointer; margin-right: 600px; color: white; font-size: 40px; -webkit-transition: var(--trans); -o-transition: var(--trans); transition: var(--trans);"
    >TDM</span>
   <span id="Home" style="margin: 1.6rem 0;cursor: pointer; margin-right: 25px; color: black; font-size: 1.2rem; font-weight: bold; -webkit-transition: var(--trans); -o-transition: var(--trans); transition: var(--trans);"
    onmouseover="this.style.color='white'" onmouseout="this.style.color='black'">Home</span>
    <span id="BMI Calculator" style="margin: 1.6rem 0;cursor: pointer; margin-ri
   ght: 20px; color: black; font-size: 1.2rem; font-weight: bold; -webkit-transition: var(--trans); -o-transition: var(--trans); transition: var(--trans);"
    onmouseover="this.style.color='white'" onmouseout="this.style.color='black'">BMI Calculator </span>
    <span id="diettips" style="margin: 1.6rem 0; margin-right: 25px; cursor: pointer;color: black; font-size: 1.2rem; font-weight: bold; -webkit-transition: var(--trans); -o-transition: var(--trans); transition: var(--trans);"
    onmouseover="this.style.color='white'" onmouseout="this.style.color='black'">Diet tips</span>
    <span id="ToDo" style="margin: 1.6rem 0; margin-right: 25px; color: black; cursor: pointer;font-size: 1.2rem; font-weight: bold; -webkit-transition: var(--trans); -o-transition: var(--trans); transition: var(--trans);"
    onmouseover="this.style.color='white'" onmouseout="this.style.color='black'">ToDo</span>
    <span id="Today" style="margin: 1.6rem 0; margin-right: 25px; color: black;cursor: pointer; font-size: 1.2rem; font-weight: bold; -webkit-transition: var(--trans); -o-transition: var(--trans); transition: var(--trans);"
    onmouseover="this.style.color='white'" onmouseout="this.style.color='black'">Today</span>
    <span id="Chatbot" style="margin: 1.6rem 0; margin-right: 25px; color: black;cursor: pointer; font-size: 1.2rem; font-weight: bold; -webkit-transition: var(--trans); -o-transition: var(--trans); transition: var(--trans);"
    onmouseover="this.style.color='white'" onmouseout="this.style.color='black'">Chatbot</span>


         <span id="logout" style="margin: 1.6rem 0; margin-right: 25px; color: black;cursor: pointer; font-size: 1.2rem; font-weight: bold; -webkit-transition: var(--trans); -o-transition: var(--trans); transition: var(--trans);"
    onmouseover="this.style.color='white'" onmouseout="this.style.color='black'">Logout</span>

</div>
    </headerlink>
    
    <div class="container">
        <h2>To-Do List</h2>

        <?php
        
        $host = 'localhost';
        $dbname = 'todo_list';
        $username = 'root';
        $password = '';
        try {
            $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
        function loadTasks($pdo) {
            $stmt = $pdo->query("SELECT * FROM tasks");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        function addTask($pdo, $task) {
            $stmt = $pdo->prepare("INSERT INTO tasks (task) VALUES (:task)");
            $stmt->execute(['task' => $task]);
        }
        
        function deleteTask($pdo, $id) {
            $stmt = $pdo->prepare("DELETE FROM tasks WHERE id = :id");
            $stmt->execute(['id' => $id]);
        }

        if (isset($_POST['editTask']) && isset($_POST['editId'])) {
            $editId = $_POST['editId'];
            $editTask = trim($_POST['editTask']);
            if (!empty($editTask)) {
                $stmt = $pdo->prepare("UPDATE tasks SET task = :task WHERE id = :id");
                $stmt->execute(['task' => $editTask, 'id' => $editId]);
            }
        }
        $tasks = loadTasks($pdo);

        if (isset($_POST['task'])) {
            $task = trim($_POST['task']);
            if (!empty($task)) {
                addTask($pdo, $task);
                $tasks = loadTasks($pdo);
            }
        }

        if (isset($_GET['delete'])) {
            $id = $_GET['delete'];
            deleteTask($pdo, $id);
           
            $tasks = loadTasks($pdo);
        }
        ?>

        <form method="POST" action="">
            <input type="text" name="task" placeholder="Enter task" required>
            <button type="submit">Add Task</button>
        </form>

        <ul>
            <?php foreach ($tasks as $index => $task): ?>
                <li>
                    <span><?php echo $task['task']; ?></span>
                    <a href="?delete=<?php echo $task['id']; ?>">Delete</a>
                    <button onclick="toggleEditForm(<?php echo $index; ?>)">Edit</button>
                    <div id="editForm_<?php echo $index; ?>" class="edit-form" style="display: none;">
                        <form method="POST" action="">
                            <input type="hidden" name="editId" value="<?php echo $task['id']; ?>">
                            <input type="text" name="editTask" value="<?php echo $task['task']; ?>" required>
                            <button type="submit">Save</button>
                            <button type="button" onclick="toggleEditForm(<?php echo $index; ?>)">Cancel</button>
                        </form>
                    </div>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
    <script>
         document.getElementById('logo').addEventListener('click', function() {
            window.location.href = 'index.html';
        });
        document.getElementById('Home').addEventListener('click', function() {
            window.location.href = 'index.html';
        });

        document.getElementById('BMI Calculator').addEventListener('click', function() {
            window.location.href = 'bmi.html';
        });

        document.getElementById('diettips').addEventListener('click', function() {
            window.location.href = 'diettips.html';
        });
        document.getElementById('ToDo').addEventListener('click', function() {
            window.location.href = 'try.php';
        });
        document.getElementById('Today').addEventListener('click', function() {
            window.location.href = 'today.html';
        });
        document.getElementById('Chatbot').addEventListener('click', function() {
            window.location.href = 'aibot.html';
        });
       document.getElementById('logout').addEventListener('click', function() {
            window.location.href = 'index.php';
        });
    </script>

</body>
</html>
