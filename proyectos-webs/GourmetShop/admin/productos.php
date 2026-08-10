<?php
$pageTitle = 'Administrar productos';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_login();

if (($_SESSION['usuario']['rol'] ?? '') !== 'admin') {
    http_response_code(403);
    exit('Acceso denegado.');
}

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $accion = $_POST['accion'] ?? '';
    try {
        if ($accion === 'crear') {
            $stmt = db()->prepare("INSERT INTO PRODUCTOS (nombre, descripcion, categoria, precio, cantidad_inventario)
                                   VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([
                trim($_POST['nombre'] ?? ''),
                trim($_POST['descripcion'] ?? ''),
                trim($_POST['categoria'] ?? ''),
                (float)$_POST['precio'],
                (int)$_POST['stock']
            ]);
            $success = 'Producto registrado.';
        }
        if ($accion === 'eliminar') {
            $stmt = db()->prepare("DELETE FROM PRODUCTOS WHERE id = ?");
            $stmt->execute([(int)$_POST['id']]);
            $success = 'Producto eliminado.';
        }
    } catch (Throwable $e) {
        $error = 'No fue posible procesar la operación.';
    }
}
$productos = db()->query("SELECT * FROM PRODUCTOS ORDER BY id DESC")->fetchAll();
require __DIR__ . '/../includes/header.php';
?>
<div class="container py-5">
    <h1 class="section-title mb-4">Administración de productos</h1>
    <?php if ($success): ?><div class="alert alert-success"><?= htmlspecialchars($success) ?></div><?php endif; ?>
    <?php if ($error): ?><div class="alert alert-danger"><?= htmlspecialchars($error) ?></div><?php endif; ?>

    <div class="card form-card mb-4">
        <div class="card-body p-4">
            <h2 class="h5">Registrar alimento/producto gourmet</h2>
            <form method="post" class="row g-3" data-validate="true" novalidate>
                <input type="hidden" name="accion" value="crear">
                <div class="col-md-6"><label class="form-label">Nombre</label><input class="form-control" name="nombre" required></div>
                <div class="col-md-6"><label class="form-label">Categoría</label>
                    <select class="form-select" name="categoria" required>
                        <option value="">Seleccione</option><option>Vino</option><option>Queso</option><option>Chocolate</option>
                    </select>
                </div>
                <div class="col-12"><label class="form-label">Descripción</label><textarea class="form-control" name="descripcion" required></textarea></div>
                <div class="col-md-6"><label class="form-label">Precio</label><input class="form-control" type="number" name="precio" min="0" step="1" required></div>
                <div class="col-md-6"><label class="form-label">Inventario</label><input class="form-control" type="number" name="stock" min="0" required></div>
                <div class="col-12"><button class="btn btn-warning" type="submit">Guardar producto</button></div>
            </form>
        </div>
    </div>

    <div class="card border-0 shadow-sm table-card">
        <div class="table-responsive">
            <table class="table mb-0">
                <thead class="table-dark"><tr><th>ID</th><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th></th></tr></thead>
                <tbody>
                <?php foreach ($productos as $p): ?>
                    <tr>
                        <td><?= (int)$p['id'] ?></td>
                        <td><?= htmlspecialchars($p['nombre']) ?></td>
                        <td><?= htmlspecialchars($p['categoria']) ?></td>
                        <td>$<?= number_format($p['precio'], 0, ',', '.') ?></td>
                        <td><?= (int)$p['cantidad_inventario'] ?></td>
                        <td>
                            <form method="post">
                                <input type="hidden" name="accion" value="eliminar">
                                <input type="hidden" name="id" value="<?= (int)$p['id'] ?>">
                                <button class="btn btn-outline-danger btn-sm" type="submit">Eliminar</button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
<?php require __DIR__ . '/../includes/footer.php'; ?>