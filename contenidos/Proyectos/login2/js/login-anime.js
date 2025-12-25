function login() {
  const user = document.getElementById("usuario").value;
  const pass = document.getElementById("password").value;
  const mensaje = document.getElementById("mensaje");

  // Credenciales demo
  if (user === "anime" && pass === "1234") {
    mensaje.style.color = "#22c55e";
    mensaje.textContent = "Acceso concedido ✨";

    setTimeout(() => {
      window.location.href = "../login2/index.html";
    }, 1000);

  } else {
    mensaje.style.color = "#ef4444";
    mensaje.textContent = "Usuario o contraseña incorrectos ❌";
  }
}
