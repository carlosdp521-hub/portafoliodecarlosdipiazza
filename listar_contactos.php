<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "portafolio";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("❌ Error de conexión: " . $conn->connect_error);
}

// Consultar contactos
$result = $conn->query("SELECT * FROM contactos ORDER BY fecha DESC");
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Lista de Contactos</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    table { border-collapse: collapse; width: 100%; margin-top: 15px; }
    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
    th { background: #f4f4f4; }
    .success { background: #d4edda; color: #155724; padding: 10px; border: 1px solid #c3e6cb; margin-bottom: 15px; border-radius: 5px; }
  </style>
</head>
<body>

  <h2>Contactos recibidos</h2>

  <?php if (isset($_GET['success']) && $_GET['success'] == 1): ?>
    <div class="success">✅ Mensaje guardado correctamente</div>
  <?php endif; ?>

  <table>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Correo</th>
      <th>Mensaje</th>
      <th>Fecha</th>
    </tr>
    <?php while ($row = $result->fetch_assoc()) { ?>
      <tr>
        <td><?= htmlspecialchars($row['id']) ?></td>
        <td><?= htmlspecialchars($row['nombre']) ?></td>
        <td><?= htmlspecialchars($row['correo']) ?></td>
        <td><?= nl2br(htmlspecialchars($row['mensaje'])) ?></td>
        <td><?= $row['fecha'] ?></td>
      </tr>
    <?php } ?>
  </table>

  <p><a href="index.html">⬅ Volver al inicio</a></p>

</body>
</html>
<?php
$conn->close();
?>
