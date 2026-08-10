<?php
$pageTitle = 'Iniciar sesión';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/auth.php';

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $password === '') {
        $error = 'Ingresa un correo válido y tu contraseña.';
    } else {
        $stmt = db()->prepare("SELECT id, nombre, email, contraseña, direccion, telefono, rol
                               FROM USUARIOS WHERE email = ? LIMIT 1");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['contraseña'])) {
            session_regenerate_id(true);
            unset($user['contraseña']);
            $_SESSION['usuario'] = $user;
            $_SESSION['carrito'] = $_SESSION['carrito'] ?? [];
            header('Location: index.php');
            exit;
        }
        $error = 'Credenciales incorrectas.';
    }
}
require __DIR__ . '/includes/header.php';
?>
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-7 col-lg-5">
            <div class="card form-card">
                <div class="card-body p-4">
                    <h1 class="h3 mb-3">Iniciar sesión</h1>
                    <p class="text-secondary">Ingresa a tu cuenta para gestionar tu carrito y pedidos.</p>
                    <?php if ($error): ?><div class="alert alert-danger"><?= htmlspecialchars($error) ?></div><?php endif; ?>
                    <form method="post" data-validate="true" novalidate>
                        <div class="mb-3">
                            <label for="email" class="form-label">Correo electrónico</label>
                            <input type="email" class="form-control" id="email" name="email" required autocomplete="email">
                            <div class="invalid-feedback">Ingresa un correo válido.</div>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Contraseña</label>
                            <input type="password" class="form-control" id="password" name="password" required autocomplete="current-password">
                            <div class="invalid-feedback">La contraseña es obligatoria.</div>
                        </div>
                        <button class="btn btn-dark w-100" type="submit">Ingresar</button>
                    </form>
                    <p class="small mt-3 mb-0">¿No tienes cuenta? <a href="registro.php">Regístrate aquí</a>.</p>
                </div>
            </div>
        </div>
    </div>
</div>
<?php require __DIR__ . '/includes/footer.php'; ?>