<?php
$pageTitle = 'Productos gourmet';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/auth.php';
require_login();

$stmt = db()->query("SELECT id, nombre, descripcion, categoria, precio, cantidad_inventario
                     FROM PRODUCTOS WHERE cantidad_inventario > 0 ORDER BY categoria, nombre");
$productos = $stmt->fetchAll();

require __DIR__ . '/includes/header.php';
?>
<div class="container py-5">
    <div class="mb-4">
        <p class="text-uppercase small fw-bold section-title mb-1">Catálogo</p>
        <h1 class="section-title">Productos gourmet</h1>
    </div>
    <div class="row g-4">
        <?php foreach ($productos as $p): ?>
            <div class="col-md-6 col-lg-4">
                <article class="card product-card h-100">
                    <div class="product-image bg-light d-flex justify-content-center align-items-center fs-1">
                        <?= $p['categoria'] === 'Vino' ? '🍷' : ($p['categoria'] === 'Queso' ? '🧀' : '🍫') ?>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <span class="badge text-bg-secondary align-self-start"><?= htmlspecialchars($p['categoria']) ?></span>
                        <h2 class="h5 mt-2"><?= htmlspecialchars($p['nombre']) ?></h2>
                        <p class="text-secondary flex-grow-1"><?= htmlspecialchars($p['descripcion']) ?></p>
                        <p class="price">$<?= number_format((float)$p['precio'], 0, ',', '.') ?></p>
                        <form action="carrito.php" method="post">
                            <input type="hidden" name="accion" value="agregar">
                            <input type="hidden" name="producto_id" value="<?= (int)$p['id'] ?>">
                            <div class="input-group mb-2">
                                <span class="input-group-text">Cantidad</span>
                                <input type="number" class="form-control" name="cantidad" value="1" min="1"
                                       max="<?= (int)$p['cantidad_inventario'] ?>" data-qty required>
                            </div>
                            <button class="btn btn-dark w-100" type="submit">Agregar al carrito</button>
                        </form>
                    </div>
                </article>
            </div>
        <?php endforeach; ?>
    </div>
</div>
<?php require __DIR__ . '/includes/footer.php'; ?>