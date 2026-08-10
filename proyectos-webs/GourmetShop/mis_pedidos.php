<?php
$pageTitle = 'Mis pedidos';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/auth.php';
require_login();

$stmt = db()->prepare("SELECT id, fecha, direccion_envio, monto_total, estado
                       FROM PEDIDOS WHERE usuario_id = ? ORDER BY id DESC");
$stmt->execute([$_SESSION['usuario']['id']]);
$pedidos = $stmt->fetchAll();

require __DIR__ . '/includes/header.php';
?>
<div class="container py-5">
    <h1 class="section-title mb-4">Mis pedidos</h1>
    <div class="card border-0 shadow-sm table-card">
        <div class="table-responsive">
            <table class="table table-striped mb-0">
                <thead class="table-dark"><tr><th>ID</th><th>Fecha</th><th>Dirección</th><th>Total</th><th>Estado</th></tr></thead>
                <tbody>
                <?php foreach ($pedidos as $p): ?>
                    <tr>
                        <td>#<?= (int)$p['id'] ?></td>
                        <td><?= htmlspecialchars($p['fecha']) ?></td>
                        <td><?= htmlspecialchars($p['direccion_envio']) ?></td>
                        <td>$<?= number_format($p['monto_total'], 0, ',', '.') ?></td>
                        <td><span class="badge text-bg-secondary"><?= htmlspecialchars($p['estado']) ?></span></td>
                    </tr>
                <?php endforeach; ?>
                <?php if (!$pedidos): ?><tr><td colspan="5" class="text-center py-4">Aún no tienes pedidos.</td></tr><?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
<?php require __DIR__ . '/includes/footer.php'; ?>