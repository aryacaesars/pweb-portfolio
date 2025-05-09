<?php
// Konfigurasi database
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'portfolio';

// Membuat koneksi
$conn = new mysqli($host, $user, $pass, $db);

// Cek koneksi
if ($conn->connect_error) {
    die('Koneksi gagal: ' . $conn->connect_error);
}

// Ambil data dari form
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$message = $_POST['message'] ?? '';

// Validasi sederhana
if ($name && $email && $phone && $message) {
    $stmt = $conn->prepare('INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)');
    $stmt->bind_param('ssss', $name, $email, $phone, $message);
    if ($stmt->execute()) {
        echo 'success';
    } else {
        echo 'Gagal menyimpan data.';
    }
    $stmt->close();
} else {
    echo 'Semua field harus diisi.';
}

$conn->close();
?>
