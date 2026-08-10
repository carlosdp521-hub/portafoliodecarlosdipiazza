<?php
$pageTitle = 'GourmetShop | Inicio';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/auth.php';

$productos = [];
try {
    $stmt = db()->query("SELECT id, nombre, descripcion, categoria, precio, cantidad_inventario
                         FROM PRODUCTOS WHERE cantidad_inventario > 0
                         ORDER BY id DESC LIMIT 6");
    $productos = $stmt->fetchAll();
} catch (Throwable $e) {
    $productos = [];
}
require __DIR__ . '/includes/header.php';
?>
<section class="hero">
    <div class="container">
        <div class="row align-items-center g-4">
            <div class="col-lg-7">
                <p class="text-uppercase fw-semibold">Sabores seleccionados</p>
                <h1 class="display-4">Productos gourmet para disfrutar y regalar</h1>
                <p class="lead">Compra vinos, quesos y chocolates desde una experiencia simple, segura y adaptable.</p>
                <div class="d-flex flex-wrap gap-2">
                    <a href="productos.php" class="btn btn-warning btn-lg">Ver productos</a>
                    <?php if (!current_user()): ?>
                        <a href="registro.php" class="btn btn-outline-light btn-lg">Crear cuenta</a>
                    <?php endif; ?>
                </div>
            </div>
            <div class="col-lg-5">
                <div class="card bg-white bg-opacity-10 border-light text-white shadow-lg">
                    <div class="card-body p-4">
                        <h2 class="h4">Compra en pocos pasos</h2>
                        <ol class="mb-0">
                            <li>Regístrate e inicia sesión.</li>
                            <li>Selecciona productos y cantidades.</li>
                            <li>Revisa tu carrito.</li>
                            <li>Confirma tu pedido.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-5">
    <div class="container">
        <div class="d-flex justify-content-between align-items-end mb-4">
            <div>
                <p class="text-uppercase small fw-bold section-title mb-1">Novedades</p>
                <h2 class="section-title mb-0">Productos disponibles</h2>
            </div>
            <a href="productos.php" class="btn btn-outline-dark">Ver catálogo</a>
        </div>
        <div class="row g-4">
            <?php if ($productos): foreach ($productos as $p): ?>
                <div class="col-md-6 col-lg-4">
                    <article class="card product-card h-100">
                        <div class="bg-light product-image d-flex align-items-center justify-content-center fs-1">
                            <?= $p['categoria'] === 'Vino' ? '🍷' : ($p['categoria'] === 'Queso' ? '🧀' : '🍫') ?>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <span class="badge text-bg-secondary align-self-start mb-2"><?= htmlspecialchars($p['categoria']) ?></span>
                            <h3 class="h5"><?= htmlspecialchars($p['nombre']) ?></h3>
                            <p class="text-secondary flex-grow-1"><?= htmlspecialchars($p['descripcion']) ?></p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="price">$<?= number_format((float)$p['precio'], 0, ',', '.') ?></span>
                                <?php if (current_user()): ?>
                                    <a class="btn btn-dark btn-sm" href="productos.php">Comprar</a>
                                <?php endif; ?>
                            </div>
                        </div>
                    </article>
                </div>
            <?php endforeach; else: ?>
                <div class="col-12"><div class="alert alert-info">Instala la base de datos mediante <code>database.sql</code> para mostrar productos.</div></div>
            <?php endif; ?>
        </div>
    </div>
</section>
<?php require __DIR__ . '/includes/footer.php'; ?>