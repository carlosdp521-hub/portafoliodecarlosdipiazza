function login() {
    const usuario = document.getElementById("usuario").value;
    const clave = document.getElementById("clave").value;
    const mensaje = document.getElementById("mensaje");

    // Credenciales permitidas (puedes cambiarlas)
    const USER = "carlos";
    const PASS = "1234";

    if (usuario === "" || clave === "") {
        mensaje.textContent = "⚠️ Complete todos los campos";
        return;
    }

    if (usuario === USER && clave === PASS) {
        // Guardar sesión
        localStorage.setItem("logueado", "true");

        // Redirigir al portafolio
        window.location.href = "index.html";
    } else {
        mensaje.textContent = "❌ Usuario o contraseña incorrectos";
    }
}
