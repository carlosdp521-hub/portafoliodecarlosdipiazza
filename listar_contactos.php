<?php
// ============================
// listar_contactos.php
// Muestra los contactos almacenados en la base de datos.
// Incluye protección contra XSS y manejo de errores.
// ============================

// ⚠️ Ajusta estas credenciales según tu servidor
$host = "localhost";
$user = "root";
$pass = "";
$db   = "portafolio";

// 1. Conexión a la base de datos
$conn = new mysqli($host, $user, $pass, $db);

// 2. Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// 3. Consultar registros
$sql = "SELECT id, nombre, correo, mensaje, fecha FROM contactos ORDER BY fecha DESC";
$result = $conn->query($sql);

// 4. Mostrar en tabla HTML
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Lista de Contactos</title>
  <link rel="stylesheet" href="css/style.css"> <!-- Opcional: reutilizar tus estilos -->
</head>
<body>
  <h1>📋 Lista de Contactos</h1>
  <?php if ($result && $result->num_rows > 0): ?>
    <table border="1" cellpadding="10" cellspacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Mensaje</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        <?php while($row = $result->fetch_assoc()): ?>
          <tr>
            <td><?php echo htmlspecialchars($row['id']); ?></td>
            <td><?php echo htmlspecialchars($row['nombre']); ?></td>
            <td><?php echo htmlspecialchars($row['correo']); ?></td>
            <td><?php echo nl2br(htmlspecialchars($row['mensaje'])); ?></td>
            <td><?php echo htmlspecialchars($row['fecha']); ?></td>
          </tr>
        <?php endwhile; ?>
      </tbody>
    </table>
  <?php else: ?>
    <p>⚠️ No hay contactos registrados aún.</p>
  <?php endif; ?>

  <br>
  <a href="index.html">⬅ Volver al inicio</a>
</body>
</html>
<?php
// 5. Cerrar conexión
$conn->close();
?>
