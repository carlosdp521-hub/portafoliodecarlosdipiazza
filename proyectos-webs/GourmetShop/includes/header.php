<?php
require_once __DIR__ . '/auth.php';
$usuario = current_user();
$cartCount = 0;
if (!empty($_SESSION['carrito'])) {
    foreach ($_SESSION['carrito'] as $item) {
        $cartCount += (int)$item['cantidad'];
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle ?? 'GourmetShop') ?></title>
    <meta name="description" content="Tienda online de alimentos y productos gourmet.">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark gourmet-nav sticky-top">
    <div class="container">
        <a class="navbar-brand fw-bold" href="index.php">🍷 GourmetShop</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
                aria-controls="mainNav" aria-expanded="false" aria-label="Abrir navegación">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item"><a class="nav-link" href="index.php">Inicio</a></li>
                <?php if ($usuario): ?>
                    <li class="nav-item"><a class="nav-link" href="productos.php">Productos</a></li>
                    <li class="nav-item"><a class="nav-link" href="carrito.php">Carrito (<?= $cartCount ?>)</a></li>
                    <li class="nav-item"><a class="nav-link" href="mis_pedidos.php">Mis pedidos</a></li>
                    <?php if (($usuario['rol'] ?? '') === 'admin'): ?>
                        <li class="nav-item"><a class="nav-link" href="admin/productos.php">Administrar</a></li>
                    <?php endif; ?>
                <?php endif; ?>
            </ul>
            <div class="d-flex align-items-center gap-2">
                <?php if ($usuario): ?>
                    <span class="text-white small">Hola, <?= htmlspecialchars($usuario['nombre']) ?></span>
                    <a class="btn btn-outline-light btn-sm" href="logout.php">Cerrar sesión</a>
                <?php else: ?>
                    <a class="btn btn-outline-light btn-sm" href="login.php">Ingresar</a>
                    <a class="btn btn-warning btn-sm" href="registro.php">Registrarse</a>
                <?php endif; ?>
            </div>
        </div>
    </div>
</nav>
<main>