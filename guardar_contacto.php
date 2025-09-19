<?php
// Configuración de la base de datos
$host = "localhost";      // Servidor
$user = "root";           // Usuario (por defecto en XAMPP)
$pass = "";               // Contraseña (vacía por defecto)
$db   = "portafolio";     // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conn->connect_error) {
    die("❌ Error de conexión: " . $conn->connect_error);
}

// Verificar que los datos vengan del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre  = trim($_POST['nombre']);
    $correo  = trim($_POST['correo']);
    $mensaje = trim($_POST['mensaje']);

    if (!empty($nombre) && !empty($correo) && !empty($mensaje)) {
        // Usar consulta preparada para mayor seguridad
        $stmt = $conn->prepare("INSERT INTO contactos (nombre, correo, mensaje) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $nombre, $correo, $mensaje);

        if ($stmt->execute()) {
            // Redirigir a la lista de contactos después de guardar
            header("Location: listar_contactos.php?success=1");
            exit();
        } else {
            echo "❌ Error al guardar: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "⚠️ Todos los campos son obligatorios.";
    }
} else {
    echo "⚠️ Acceso no permitido.";
}

$conn->close();
?>
