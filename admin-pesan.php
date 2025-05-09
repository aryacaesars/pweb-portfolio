<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Pesan Kontak</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        body { font-family: 'Inter', Arial, sans-serif; background: #f7f7f7; }
        .admin-container { max-width: 800px; margin: 40px auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px #0001; padding: 2rem; }
        h1 { font-size: 2rem; margin-bottom: 1.5rem; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { padding: 0.75rem 1rem; border-bottom: 1px solid #eee; text-align: left; }
        th { background: #f0f0f0; }
        tr:last-child td { border-bottom: none; }
        .no-data { text-align: center; color: #888; padding: 2rem 0; }
    </style>
</head>
<body>
    <div class="admin-container">
        <h1>Pesan Kontak Masuk</h1>
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Telepon</th>
                    <th>Pesan</th>
                    <th>Waktu</th>
                </tr>
            </thead>
            <tbody>
            <?php
            // Koneksi database
            $conn = new mysqli('localhost', 'root', '', 'portfolio');
            if ($conn->connect_error) {
                echo '<tr><td colspan="6" class="no-data">Koneksi database gagal.</td></tr>';
            } else {
                $result = $conn->query('SELECT * FROM contacts ORDER BY created_at DESC');
                if ($result && $result->num_rows > 0) {
                    $no = 1;
                    while ($row = $result->fetch_assoc()) {
                        echo '<tr>';
                        echo '<td>' . $no++ . '</td>';
                        echo '<td>' . htmlspecialchars($row['name']) . '</td>';
                        echo '<td>' . htmlspecialchars($row['email']) . '</td>';
                        echo '<td>' . htmlspecialchars($row['phone']) . '</td>';
                        echo '<td>' . nl2br(htmlspecialchars($row['message'])) . '</td>';
                        echo '<td>' . $row['created_at'] . '</td>';
                        echo '</tr>';
                    }
                } else {
                    echo '<tr><td colspan="6" class="no-data">Belum ada pesan masuk.</td></tr>';
                }
                $conn->close();
            }
            ?>
            </tbody>
        </table>
    </div>
</body>
</html>
