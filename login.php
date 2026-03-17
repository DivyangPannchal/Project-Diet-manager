<?php
session_start();
include_once('connection.php');

if (isset($_POST['login'])) {
    $username = trim($_POST['username']);
    $password = md5($_POST['password']); 

    if (empty($username) && empty($_POST['password'])) {
        $_SESSION['error'] = 'Please Fill Username and Password';
        header('location:index.php');
        exit;
    } elseif (empty($_POST['password'])) {
        $_SESSION['error'] = 'Please Fill Password';
        header('location:index.php');
        exit;
    } elseif (empty($username)) {
        $_SESSION['error'] = 'Please Fill Username';
        header('location:index.php');
        exit;
    }

    $sql = "SELECT * FROM tbl_user WHERE username = :username AND password = :password";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['username' => $username, 'password' => $password]);
    $row = $stmt->fetch();

    if ($row) {
        $_SESSION['name'] = $row['name'];
        $_SESSION['username'] = $row['username'];
        $_SESSION['password'] = $row['password'];
        header('location:index.html');
        exit;
    } else {
        $_SESSION['error'] = 'Invalid Username or Password';
        header('location:index.php');
        exit;
    }
}
?>
