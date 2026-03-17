<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>TDM — Register</title>
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
      max-width: 440px;
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
      color: var(--purple);
      text-shadow: var(--shadow-purple);
      text-align: center;
      margin-bottom: 2rem;
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
    .success-msg {
      background: rgba(0,255,136,0.1);
      border: 1px solid rgba(0,255,136,0.4);
      color: var(--green-neon);
      padding: 0.7rem 1rem;
      border-radius: 4px;
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
      text-align: center;
    }
  </style>
</head>
<body>
<div class="auth-page">
  <div class="auth-card scifi-panel scifi-panel-purple corner-decor animate-float">

    <div class="auth-logo">TDM</div>
    <div class="auth-tagline">Transform Diet Management</div>
    <div class="auth-title">NEW AGENT REGISTRATION</div>

    <form action="add.php" method="post">
      <div class="sf-form-group">
        <label class="sf-label" for="reg-name">▸ Agent Name</label>
        <input type="text" id="reg-name" class="sf-input" name="name" autocomplete="off" placeholder="enter your full name" required>
      </div>
      <div class="sf-form-group">
        <label class="sf-label" for="reg-email">▸ Identification Code</label>
        <input type="email" id="reg-email" class="sf-input" name="username" autocomplete="off" placeholder="enter your email" required>
      </div>
      <div class="sf-form-group">
        <label class="sf-label" for="reg-pass">▸ Access Key</label>
        <input type="password" id="reg-pass" class="sf-input" name="password" autocomplete="off" placeholder="create a password" required>
      </div>
      <button type="submit" name="register" class="sf-btn sf-btn-purple sf-btn-block sf-btn-lg" style="margin-top:0.5rem;">
        REGISTER AGENT
      </button>
    </form>

    <div class="auth-footer">
      Already registered? <a href="index.php">Login Here</a>
    </div>
  </div>
</div>
</body>
</html>
