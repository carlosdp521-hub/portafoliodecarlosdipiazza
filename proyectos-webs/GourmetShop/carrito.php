<?php
$pageTitle = 'Carrito de compras';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/auth.php';
require_login();

$_SESSION['carrito'] = $_SESSION['carrito'] ?? [];
$pdo = db();
$mensaje = '';
$error = '';

function cart_total(array $cart): float {
    $total = 0.0;
    foreach ($cart as $item) {
        $total += ((float)$item['precio']) * ((int)$item['cantidad']);
    }
    return $total;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $accion = $_POST['accion'] ?? '';

    if ($accion === 'agregar') {
        $productoId = filter_input(INPUT_POST, 'producto_id', FILTER_VALIDATE_INT);
        $cantidad = filter_input(INPUT_POST, 'cantidad', FILTER_VALIDATE_INT);

        if (!$productoId || !$cantidad || $cantidad < 1) {
            $error = 'Producto o cantidad no válidos.';
        } else {
            $stmt = $pdo->prepare("SELECT id, nombre, precio, cantidad_inventario FROM PRODUCTOS WHERE id = ?");
            $stmt->execute([$productoId]);
            $producto = $stmt->fetch();

            if (!$producto) {
                $error = 'El producto no existe.';
            } else {
                $actual = $_SESSION['carrito'][$productoId]['cantidad'] ?? 0;
                if ($actual + $cantidad > (int)$producto['cantidad_inventario']) {
                    $error = 'La cantidad solicitada supera el inventario disponible.';
                } else {
                    $_SESSION['carrito'][$productoId] = [
                        'id' => (int)$producto['id'],
                        'nombre' => $producto['nombre'],
                        'precio' => (float)$producto['precio'],
                        'cantidad' => $actual + $cantidad
                    ];
                    $mensaje = 'Producto agregado al carrito.';
                }
            }
        }
    }

    if ($accion === 'actualizar') {
        $cantidades = $_POST['cantidad'] ?? [];
        foreach ($cantidades as $id => $cantidad) {
            $id = (int)$id;
            $cantidad = (int)$cantidad;
            if (!isset($_SESSION['carrito'][$id])) continue;

            $stmt = $pdo->prepare("SELECT cantidad_inventario FROM PRODUCTOS WHERE id = ?");
            $stmt->execute([$id]);
            $stock = (int)($stmt->fetchColumn() ?: 0);

            if ($cantidad <= 0) {
                unset($_SESSION['carrito'][$id]);
            } elseif ($cantidad <= $stock) {
                $_SESSION['carrito'][$id]['cantidad'] = $cantidad;
            } else {
                $error = 'Una cantidad supera el inventario disponible.';
            }
        }
        if (!$error) $mensaje = 'Carrito actualizado.';
    }

    if ($accion === 'eliminar') {
        $id = (int)($_POST['producto_id'] ?? 0);
        unset($_SESSION['carrito'][$id]);
        $mensaje = 'Producto eliminado.';
    }

    if ($accion === 'vaciar') {
        $_SESSION['carrito'] = [];
        $mensaje = 'Carrito vacío.';
    }
}

$total = cart_total($_SESSION['carrito']);
require __DIR__ . '/includes/header.php';
?>
<div class="container py-5">
    <h1 class="section-title mb-4">Mi carrito</h1>
    <?php if ($mensaje): ?><div class="alert alert-success"><?= htmlspecialchars($mensaje) ?></div><?php endif; ?>
    <?php if ($error): ?><div class="alert alert-danger"><?= htmlspecialchars($error) ?></div><?php endif; ?>

    <?php if (!$_SESSION['carrito']): ?>
        <div class="card form-card"><div class="card-body p-5 text-center">
            <h2 class="h4">Tu carrito está vacío</h2>
            <p class="text-secondary">Agrega productos desde nuestro catálogo.</p>
            <a href="productos.php" class="btn btn-dark">Ver productos</a>
        </div></div>
    <?php else: ?>
        <div class="card table-card border-0 shadow-sm">
            <div class="table-responsive">
                <table class="table align-middle mb-0">
                    <thead class="table-dark">
                        <tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th>Acción</th></tr>
                    </thead>
                    <tbody>
                    <?php foreach ($_SESSION['carrito'] as $item): ?>
                        <tr>
                            <td><?= htmlspecialchars($item['nombre']) ?></td>
                            <td>$<?= number_format($item['precio'], 0, ',', '.') ?></td>
                            <td>
                                <input form="formActualizar" type="number" class="form-control" name="cantidad[<?= (int)$item['id'] ?>]"
                                       value="<?= (int)$item['cantidad'] ?>" min="1" data-qty>
                            </td>
                            <td>$<?= number_format($item['precio'] * $item['cantidad'], 0, ',', '.') ?></td>
                            <td>
                                <form method="post" data-confirm-delete>
                                    <input type="hidden" name="accion" value="eliminar">
                                    <input type="hidden" name="producto_id" value="<?= (int)$item['id'] ?>">
                                    <button class="btn btn-outline-danger btn-sm" type="submit">Eliminar</button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
            <div class="card-body d-flex flex-wrap justify-content-between align-items-center gap-3">
                <form id="formActualizar" method="post">
                    <input type="hidden" name="accion" value="actualizar">
                    <button class="btn btn-outline-dark" type="submit">Actualizar cantidades</button>
                </form>
                <div class="text-end">
                    <div class="cart-total">Total: $<?= number_format($total, 0, ',', '.') ?></div>
                    <a href="pedido.php" class="btn btn-warning mt-2">Continuar con pedido</a>
                </div>
            </div>
        </div>
        <form method="post" class="mt-3">
            <input type="hidden" name="accion" value="vaciar">
            <button class="btn btn-link text-danger" type="submit">Vaciar carrito</button>
        </form>
    <?php endif; ?>
</div>
<?php require __DIR__ . '/includes/footer.php'; ?>