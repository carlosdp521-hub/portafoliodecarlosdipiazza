<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Método no permitido.');
}

$nombre = trim($_POST['nombre'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$direccion = trim($_POST['direccion'] ?? '');
$telefono = trim($_POST['telefono'] ?? '');

if ($nombre === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    strlen($password) < 8 || !preg_match('/[A-Z]/', $password) ||
    !preg_match('/[a-z]/', $password) || !preg_match('/[0-9]/', $password)) {
    exit('Datos inválidos.');
}

$stmt = db()->prepare("INSERT INTO USUARIOS
    (nombre, email, contraseña, direccion, telefono, rol)
    VALUES (?, ?, ?, ?, ?, 'cliente')");
$stmt->execute([$nombre, $email, password_hash($password, PASSWORD_DEFAULT), $direccion, $telefono]);

header('Location: ../login.php');
exit;
?>