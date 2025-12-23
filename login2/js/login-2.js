function login() {
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    const mensaje = document.getElementById("mensaje");

    // Credenciales simuladas
    const USER = "carlos";
    const PASS = "1234";

    if (usuario === USER && password === PASS) {
        // Guardar sesión
        localStorage.setItem("logueado", "true");
        window.location.href = "index.html";
    } else {
        mensaje.textContent = "Usuario o contraseña incorrectos";
    }
}
