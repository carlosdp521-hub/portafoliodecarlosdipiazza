<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_login();

header('Content-Type: application/json; charset=utf-8');

if (($_SESSION['usuario']['rol'] ?? '') !== 'admin') {
    http_response_code(403);
    echo json_encode(['ok' => false, 'mensaje' => 'Acceso denegado.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'mensaje' => 'Método no permitido.']);
    exit;
}

$nombre = trim($_POST['nombre'] ?? '');
$descripcion = trim($_POST['descripcion'] ?? '');
$categoria = trim($_POST['categoria'] ?? '');
$precio = filter_input(INPUT_POST, 'precio', FILTER_VALIDATE_FLOAT);
$stock = filter_input(INPUT_POST, 'stock', FILTER_VALIDATE_INT);

if ($nombre === '' || $descripcion === '' || $categoria === '' ||
    $precio === false || $precio < 0 || $stock === false || $stock < 0) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'mensaje' => 'Datos inválidos.']);
    exit;
}

$stmt = db()->prepare("INSERT INTO PRODUCTOS (nombre, descripcion, categoria, precio, cantidad_inventario)
                       VALUES (?, ?, ?, ?, ?)");
$stmt->execute([$nombre, $descripcion, $categoria, $precio, $stock]);

echo json_encode(['ok' => true, 'id' => db()->lastInsertId()]);
?>