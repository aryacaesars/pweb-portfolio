<?php
// Tes apakah file PHP dijalankan
echo "PHP file loaded<br>";

$host = "localhost";
$user = "root";
$pass = ""; // ganti sesuai password MySQL Anda
$db   = "pweb";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

$name    = $_POST['name'] ?? '';
$email   = $_POST['email'] ?? '';
$phone   = $_POST['phone'] ?? '';
$message = $_POST['message'] ?? '';

$stmt = $conn->prepare("INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)");
if (!$stmt) {
    die("Prepare failed: " . $conn->error);
}
$stmt->bind_param("ssss", $name, $email, $phone, $message);

if ($stmt->execute()) {
    echo "success";
} else {
    echo "Query error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>