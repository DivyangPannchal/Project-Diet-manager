<?php
include_once('connection.php');

if(isset($_POST['register']))
{
    $name = trim($_POST['name']);
    $username = trim($_POST['username']);  
    $pass = md5($_POST['password']); // Using md5 for legacy compatibility

    $sql = "INSERT INTO tbl_user (name, username, password) VALUES (:name, :username, :password)";
    $stmt = $pdo->prepare($sql);
    
    try {
        $stmt->execute([
            'name' => $name, 
            'username' => $username, 
            'password' => $pass
        ]);
        echo "<script>alert('New User Register Success'); window.location.href='index.php';</script>";   
    } catch(PDOException $e) {
        die("Error registering user: " . $e->getMessage());
    }
}
?>
