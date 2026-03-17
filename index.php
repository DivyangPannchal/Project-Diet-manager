<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>TDM — System Access</title>
  <link rel="stylesheet" href="scifi.css">
  <style>
    .auth-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .auth-card {
      width: 100%;
      max-width: 420px;
      padding: 3rem 2.5rem;
    }
    .auth-logo {
      font-family: var(--font-head);
      font-size: 3rem;
      font-weight: 900;
      letter-spacing: 8px;
      color: var(--cyan);
      text-shadow: var(--shadow-cyan);
      text-align: center;
      margin-bottom: 0.3rem;
      animation: flicker 5s infinite;
    }
    .auth-tagline {
      text-align: center;
      font-size: 0.78rem;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 2.5rem;
    }
    .auth-title {
      font-family: var(--font-head);
      font-size: 1.1rem;
      letter-spacing: 3px;
      color: var(--cyan);
      text-align: center;
      margin-bottom: 2rem;
    }
    .status-line {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      justify-content: center;
      font-size: 0.78rem;
      letter-spacing: 2px;
      color: var(--green-neon);
      margin-bottom: 2rem;
      text-transform: uppercase;
    }
    .status-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--green-neon);
      box-shadow: 0 0 8px var(--green-neon);
      animation: blink-dot 1.5s infinite;
    }
    .error-msg {
      background: rgba(255,26,75,0.1);
      border: 1px solid rgba(255,26,75,0.4);
      color: var(--red-neon);
      padding: 0.7rem 1rem;
      border-radius: 4px;
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
      text-align: center;
      letter-spacing: 1px;
    }
    .auth-footer {
      text-align: center;
      margin-top: 1.5rem;
      font-size: 0.9rem;
      color: var(--text-muted);
      letter-spacing: 1px;
    }
    .auth-footer a {
      color: var(--cyan);
      text-decoration: none;
      font-weight: 600;
      transition: var(--trans);
    }
    .auth-footer a:hover { text-shadow: var(--shadow-cyan); }
  </style>
</head>
<body>
<div class="auth-page">
  <div class="auth-card scifi-panel corner-decor animate-float">

    <div class="auth-logo">TDM</div>
    <div class="auth-tagline">Transform Diet Management</div>

    <div class="status-line">
      <span class="status-dot"></span>
      System Online — Awaiting Authentication
    </div>

    <div class="auth-title">SYSTEM ACCESS</div>

    <?php
      session_start();
      if (isset($_SESSION['error'])) {
        echo '<div class="error-msg">⚠ ' . htmlspecialchars($_SESSION['error']) . '</div>';
        unset($_SESSION['error']);
      }
    ?>

    <form action="login.php" method="post">
      <div class="sf-form-group">
        <label class="sf-label" for="login-email">▸ Identification Code</label>
        <input type="email" id="login-email" class="sf-input" name="username" autocomplete="off" placeholder="enter your email" required>
      </div>
      <div class="sf-form-group">
        <label class="sf-label" for="login-pass">▸ Access Key</label>
        <input type="password" id="login-pass" class="sf-input" name="password" autocomplete="off" placeholder="enter your password" required>
      </div>
      <button type="submit" name="login" class="sf-btn sf-btn-block sf-btn-lg" style="margin-top:0.5rem;">
        INITIATE ACCESS
      </button>
    </form>

    <div class="auth-footer">
      No account? <a href="register.php">Register Here</a>
    </div>
  </div>
</div>
</body>
</html>