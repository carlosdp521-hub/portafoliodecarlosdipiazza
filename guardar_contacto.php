<?php
// ============================
// guardar_contacto.php
// Este archivo recibe los datos del formulario de index.html
// y los guarda en la base de datos de forma segura.
// ============================

// ⚠️ Ajusta estas credenciales según tu servidor
$host = "localhost";
$user = "root";
$pass = "";
$db   = "portafolio";

// 1. Conectar a la base de datos
$conn = new mysqli($host, $user, $pass, $db);

// 2. Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// 3. Validar que los datos existen antes de procesar
if (!empty($_POST['nombre']) && !empty($_POST['correo']) && !empty($_POST['mensaje'])) {
    // Sanitizar entradas (elimina espacios y caracteres innecesarios)
    $nombre  = trim($_POST['nombre']);
    $correo  = trim($_POST['correo']);
    $mensaje = trim($_POST['mensaje']);

    // 4. Preparar consulta para evitar inyección SQL
    $stmt = $conn->prepare("INSERT INTO contactos (nombre, correo, mensaje) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nombre, $correo, $mensaje);

    if ($stmt->execute()) {
        echo "<p>✅ Gracias $nombre, tu mensaje fue enviado correctamente.</p>";
        echo "<a href='index.html'>Volver al inicio</a>";
    } else {
        echo "<p>❌ Error al guardar: " . $stmt->error . "</p>";
    }

    $stmt->close();
} else {
    echo "<p>⚠️ Por favor completa todos los campos.</p>";
}

// 5. Cerrar conexión
$conn->close();
?>

