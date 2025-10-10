<?php
// Incluimos las clases de PHPMailer manualmente
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../phpmailer/src/Exception.php';
require __DIR__ . '/../phpmailer/src/PHPMailer.php';
require __DIR__ . '/../phpmailer/src/SMTP.php';

// Configurar cabecera JSON
header('Content-Type: application/json; charset=UTF-8');

// Verificar que sea POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Sanear entradas
    $nombre  = htmlspecialchars(trim($_POST['nombre'] ?? ''));
    $email   = htmlspecialchars(trim($_POST['email'] ?? ''));
    $mensaje = htmlspecialchars(trim($_POST['mensaje'] ?? ''));

    // Validaciones
    if (empty($nombre) || empty($email) || empty($mensaje)) {
        echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Correo electrónico no válido.']);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Configuración SMTP Gmail
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'carlosmdipiazzaf@gmail.com'; // tu Gmail
        $mail->Password   = 'fnbu yugp mhid evtj'; // contraseña de aplicación
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Remitente y destinatario
        $mail->setFrom('portafolioweb@gmail.com', 'Portafolio Web');
        $mail->addAddress('carlosmdipiazzaf@gmail.com', 'Carlos'); // destinatario
        $mail->addReplyTo($email, $nombre); // responder al remitente

        // Contenido del correo
        $mail->isHTML(true);
        $mail->Subject = '📩 Nuevo mensaje desde tu portafolio';
        $mail->Body    = "
            <h2>Nuevo mensaje desde tu portafolio</h2>
            <p><b>Nombre:</b> {$nombre}</p>
            <p><b>Email:</b> {$email}</p>
            <p><b>Mensaje:</b><br>{$mensaje}</p>
        ";
        $mail->AltBody = "Nombre: $nombre\nEmail: $email\nMensaje:\n$mensaje";

        $mail->send();
        echo json_encode(['status' => 'success', 'message' => 'Mensaje enviado correctamente.']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error al enviar: ' . $mail->ErrorInfo]);
    }
}
