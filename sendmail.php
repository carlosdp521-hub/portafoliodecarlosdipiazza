<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $nombre = htmlspecialchars($_POST['nombre']);
    $email = htmlspecialchars($_POST['email']);
    $mensaje = htmlspecialchars($_POST['mensaje']);

    $to = "carlosmdipiazzaf@gmail.com"; // tu correo
    $subject = "Nuevo mensaje del portafolio";
    $body = "De: $nombre\nCorreo: $email\n\nMensaje:\n$mensaje";
    $headers = "From: $email";

    if(mail($to, $subject, $body, $headers)){
        echo "✅ Mensaje enviado con éxito.";
    } else {
        echo "❌ Error al enviar el mensaje.";
    }
}
?>
