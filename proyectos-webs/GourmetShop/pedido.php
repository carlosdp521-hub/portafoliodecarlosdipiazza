<?php
$pageTitle = 'Confirmar pedido';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/auth.php';
require_login();

$cart = $_SESSION['carrito'] ?? [];
$error = '';
$success = '';

$total = 0;
foreach ($cart as $item) $total += $item['precio'] * $item['cantidad'];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $cart) {
    $direccion = trim($_POST['direccion'] ?? '');
    if ($direccion === '') {
        $error = 'La dirección de envío es obligatoria.';
    } else {
        $pdo = db();
        try {
            $pdo->beginTransaction();

            foreach ($cart as $item) {
                $stmt = $pdo->prepare("SELECT cantidad_inventario FROM PRODUCTOS WHERE id = ? FOR UPDATE");
                $stmt->execute([$item['id']]);
                $stock = (int)$stmt->fetchColumn();

                if ($stock < $item['cantidad']) {
                    throw new RuntimeException('El producto "' . $item['nombre'] . '" no tiene stock suficiente.');
                }
            }

            $stmt = $pdo->prepare("INSERT INTO PEDIDOS (usuario_id, direccion_envio, monto_total, estado)
                                   VALUES (?, ?, ?, 'Pendiente')");
            $stmt->execute([$_SESSION['usuario']['id'], $direccion, $total]);
            $pedidoId = (int)$pdo->lastInsertId();

            $detalle = $pdo->prepare("INSERT INTO DETALLE_PEDIDO (pedido_id, producto_id, cantidad, precio_unitario, subtotal)
                                      VALUES (?, ?, ?, ?, ?)");
            $updateStock = $pdo->prepare("UPDATE PRODUCTOS SET cantidad_inventario = cantidad_inventario - ? WHERE id = ?");

            foreach ($cart as $item) {
                $subtotal = $item['precio'] * $item['cantidad'];
                $detalle->execute([$pedidoId, $item['id'], $item['cantidad'], $item['precio'], $subtotal]);
                $updateStock->execute([$item['cantidad'], $item['id']]);
            }

            $pdo->commit();
            $_SESSION['carrito'] = [];
            $success = "Pedido #$pedidoId creado correctamente.";
            $cart = [];
        } catch (Throwable $e) {
            if ($pdo->inTransaction()) $pdo->rollBack();
            $error = $e->getMessage();
        }
    }
}

require __DIR__ . '/includes/header.php';
?>
<div class="container py-5">
    <div class="row g-4">
        <div class="col-lg-7">
            <div class="card form-card">
                <div class="card-body p-4">
                    <h1 class="h3">Confirmar pedido</h1>
                    <?php if ($success): ?><div class="alert alert-success"><?= htmlspecialchars($success) ?></div><?php endif; ?>
                    <?php if ($error): ?><div class="alert alert-danger"><?= htmlspecialchars($error) ?></div><?php endif; ?>
                    <?php if ($cart): ?>
                        <form method="post" data-validate="true" novalidate>
                            <div class="mb-3">
                                <label class="form-label" for="direccion">Dirección de envío</label>
                                <textarea class="form-control" id="direccion" name="direccion" rows="4" required><?= htmlspecialchars($_SESSION['usuario']['direccion'] ?? '') ?></textarea>
                                <div class="invalid-feedback">Ingresa la dirección de envío.</div>
                            </div>
                            <button class="btn btn-warning w-100" type="submit">Confirmar compra</button>
                        </form>
                    <?php elseif (!$success): ?>
                        <p class="text-secondary">No hay productos para comprar.</p>
                        <a href="productos.php" class="btn btn-dark">Ir al catálogo</a>
                    <?php else: ?>
                        <a href="mis_pedidos.php" class="btn btn-dark">Ver mis pedidos</a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        <div class="col-lg-5">
            <div class="card form-card">
                <div class="card-body p-4">
                    <h2 class="h5">Resumen</h2>
                    <?php foreach ($cart as $item): ?>
                        <div class="d-flex justify-content-between border-bottom py-2">
                            <span><?= htmlspecialchars($item['nombre']) ?> × <?= (int)$item['cantidad'] ?></span>
                            <span>$<?= number_format($item['precio'] * $item['cantidad'], 0, ',', '.') ?></span>
                        </div>
                    <?php endforeach; ?>
                    <div class="d-flex justify-content-between pt-3 fw-bold">
                        <span>Total</span><span>$<?= number_format($total, 0, ',', '.') ?></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php require __DIR__ . '/includes/footer.php'; ?>