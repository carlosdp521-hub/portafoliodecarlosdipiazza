<?php
$pageTitle = 'Registro de usuario';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/auth.php';

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = trim($_POST['nombre'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $direccion = trim($_POST['direccion'] ?? '');
    $telefono = trim($_POST['telefono'] ?? '');

    if ($nombre === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) ||
        strlen($password) < 8 || !preg_match('/[A-Z]/', $password) ||
        !preg_match('/[a-z]/', $password) || !preg_match('/[0-9]/', $password)) {
        $error = 'Completa correctamente los datos y utiliza una contraseña segura.';
    } else {
        try {
            $stmt = db()->prepare("INSERT INTO USUARIOS (nombre, email, contraseña, direccion, telefono, rol)
                                   VALUES (?, ?, ?, ?, ?, 'cliente')");
            $stmt->execute([$nombre, $email, password_hash($password, PASSWORD_DEFAULT), $direccion, $telefono]);
            $success = 'Registro realizado correctamente. Ya puedes iniciar sesión.';
        } catch (PDOException $e) {
            $error = $e->getCode() === '23000' ? 'El correo ya está registrado.' : 'No fue posible completar el registro.';
        }
    }
}
require __DIR__ . '/includes/header.php';
?>
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-lg-7">
            <div class="card form-card">
                <div class="card-body p-4">
                    <h1 class="h3">Crear cuenta</h1>
                    <?php if ($error): ?><div class="alert alert-danger"><?= htmlspecialchars($error) ?></div><?php endif; ?>
                    <?php if ($success): ?><div class="alert alert-success"><?= htmlspecialchars($success) ?> <a href="login.php">Iniciar sesión</a></div><?php endif; ?>
                    <form method="post" data-validate="true" novalidate>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="nombre" class="form-label">Nombre</label>
                                <input type="text" class="form-control" id="nombre" name="nombre" required maxlength="100">
                                <div class="invalid-feedback">Ingresa tu nombre.</div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="email" class="form-label">Correo</label>
                                <input type="email" class="form-control" id="email" name="email" required>
                                <div class="invalid-feedback">Ingresa un correo válido.</div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Contraseña</label>
                            <input type="password" class="form-control" id="password" name="password"
                                   data-password-check="#passwordHint" minlength="8" required>
                            <div id="passwordHint" class="form-text text-danger">Mínimo 8 caracteres, una mayúscula, una minúscula y un número.</div>
                        </div>
                        <div class="row">
                            <div class="col-md-7 mb-3">
                                <label for="direccion" class="form-label">Dirección</label>
                                <input type="text" class="form-control" id="direccion" name="direccion" maxlength="200">
                            </div>
                            <div class="col-md-5 mb-3">
                                <label for="telefono" class="form-label">Teléfono</label>
                                <input type="tel" class="form-control" id="telefono" name="telefono" pattern="[+0-9 ()-]{8,20}">
                            </div>
                        </div>
                        <button class="btn btn-warning w-100" type="submit">Crear cuenta</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<?php require __DIR__ . '/includes/footer.php'; ?>