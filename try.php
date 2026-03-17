<?php
session_start();
if(!isset($_SESSION['username'])) { header("Location: index.php"); exit(); }

// Include unified connection
include_once('connection.php');

function loadTasks($pdo) {
    $stmt = $pdo->query("SELECT * FROM tasks ORDER BY id DESC");
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

if (isset($_POST['task'])) {
    $task = trim($_POST['task']);
    if (!empty($task)) addTask($pdo, $task);
}

if (isset($_GET['delete'])) {
    deleteTask($pdo, $_GET['delete']);
    header('Location: try.php');
    exit;
}

$tasks = loadTasks($pdo);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TDM — Mission Planner</title>
  <link rel="stylesheet" href="scifi.css">
  <style>
    .todo-page { padding: 5rem 2rem 3rem; }
    .todo-inner { max-width: 800px; margin: 0 auto; }

    .add-form-panel { padding: 2rem; margin-bottom: 2rem; }
    .add-row { display: flex; gap: 0.8rem; }
    .add-row input { flex: 1; }

    .task-list { list-style: none; display: flex; flex-direction: column; gap: 0.8rem; }

    .task-item {
      background: rgba(0,20,50,0.55);
      border: 1px solid rgba(0,245,255,0.2);
      border-radius: 6px;
      padding: 1rem 1.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      transition: var(--trans);
    }
    .task-item:hover { border-color: rgba(0,245,255,0.5); }

    .task-num {
      font-family: var(--font-head);
      font-size: 0.75rem;
      color: var(--cyan-dim);
      min-width: 30px;
      letter-spacing: 1px;
    }
    .task-text {
      flex: 1;
      font-size: 1rem;
      color: var(--text-primary);
      letter-spacing: 0.5px;
    }
    .task-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }

    .edit-form-inline {
      display: none;
      margin-top: 0.8rem;
      border-top: 1px solid rgba(0,245,255,0.1);
      padding-top: 0.8rem;
    }
    .edit-row { display: flex; gap: 0.6rem; }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: var(--text-muted);
      font-size: 1rem;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>

<!-- NAVBAR -->
<nav class="sf-nav" id="sfNav">
  <a href="index.html" class="sf-logo">TDM</a>
  <ul class="sf-nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="bmi.html">BMI Calc</a></li>
    <li><a href="deittipshtml.html">Diet Tips</a></li>
    <li><a href="try.php" class="active">To-Do</a></li>
    <li><a href="today.html">Today</a></li>
    <li><a href="aibot.html">NutriBot</a></li>
    <li><a href="index.php" class="logout-link">Logout</a></li>
  </ul>
  <button class="sf-hamburger" id="hamburger"><span></span><span></span><span></span></button>
</nav>
<div class="sf-mobile-menu" id="mobileMenu">
  <button class="sf-mobile-close" id="menuClose">✕</button>
  <a href="index.html">Home</a>
  <a href="bmi.html">BMI Calculator</a>
  <a href="deittipshtml.html">Diet Tips</a>
  <a href="try.php">To-Do List</a>
  <a href="today.html">Today</a>
  <a href="aibot.html">NutriBot AI</a>
  <a href="index.php" style="color:var(--red-neon)">Logout</a>
</div>

<div class="page-content todo-page">
  <div class="todo-inner">
    <h2 class="sf-section-title animate-float">MISSION PLANNER</h2>
    <div class="sf-divider"></div>
    <p class="sf-section-subtitle">Track and manage your daily health missions</p>

    <!-- ADD TASK -->
    <div class="scifi-panel corner-decor add-form-panel animate-float">
      <div style="font-family:var(--font-head);font-size:0.85rem;letter-spacing:3px;color:var(--cyan);margin-bottom:1rem">
        ▸ NEW MISSION DIRECTIVE
      </div>
      <form method="POST" action="">
        <div class="add-row">
          <input type="text" name="task" class="sf-input" placeholder="Enter your mission objective..." required>
          <button type="submit" class="sf-btn">+ ADD</button>
        </div>
      </form>
    </div>

    <!-- TASK COUNT -->
    <div style="font-size:0.85rem;letter-spacing:2px;text-transform:uppercase;color:var(--text-muted);margin-bottom:1rem">
      <?php echo count($tasks); ?> Mission<?php echo count($tasks) !== 1 ? 's' : ''; ?> Active
    </div>

    <!-- TASKS -->
    <?php if (empty($tasks)): ?>
      <div class="scifi-panel corner-decor empty-state">
        ◌ No missions yet. Add a directive above.
      </div>
    <?php else: ?>
    <ul class="task-list">
      <?php foreach ($tasks as $index => $task): ?>
      <li class="scifi-panel task-item" style="flex-wrap:wrap">
        <span class="task-num"><?= str_pad($index + 1, 2, '0', STR_PAD_LEFT) ?></span>
        <span class="task-text"><?= htmlspecialchars($task['task']) ?></span>
        <div class="task-actions">
          <button class="sf-btn sf-btn-sm" onclick="toggleEdit(<?= $index ?>)">EDIT</button>
          <a href="?delete=<?= $task['id'] ?>" class="sf-btn sf-btn-sm sf-btn-danger"
             onclick="return confirm('Delete this mission?')">DEL</a>
        </div>
        <!-- Edit inline form -->
        <div class="edit-form-inline" id="editForm_<?= $index ?>" style="width:100%">
          <form method="POST" action="">
            <input type="hidden" name="editId" value="<?= $task['id'] ?>">
            <div class="edit-row">
              <input type="text" name="editTask" class="sf-input" value="<?= htmlspecialchars($task['task']) ?>" required>
              <button type="submit" class="sf-btn sf-btn-sm">SAVE</button>
              <button type="button" class="sf-btn sf-btn-sm sf-btn-danger" onclick="toggleEdit(<?= $index ?>)">✕</button>
            </div>
          </form>
        </div>
      </li>
      <?php endforeach; ?>
    </ul>
    <?php endif; ?>

  </div>
</div>

<script>
  const nav = document.getElementById('sfNav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));
  document.getElementById('hamburger').addEventListener('click', () => document.getElementById('mobileMenu').classList.add('open'));
  document.getElementById('menuClose').addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'));

  function toggleEdit(index) {
    const f = document.getElementById('editForm_' + index);
    f.style.display = f.style.display === 'block' ? 'none' : 'block';
  }
</script>
</body>
</html>
