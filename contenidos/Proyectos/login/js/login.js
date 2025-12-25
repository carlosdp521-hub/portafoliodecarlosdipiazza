const form = document.getElementById("loginForm");
const loader = document.getElementById("loader");
const msg = document.getElementById("msg");
const card = document.getElementById("card");

// Si ya inició sesión
if (localStorage.getItem("login") === "true") {
    window.location.href = "index.html";
}

form.addEventListener("submit", e => {
    e.preventDefault();

    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    msg.textContent = "";
    loader.style.display = "block";

    setTimeout(() => {
        loader.style.display = "none";

        if (user === "admin" && pass === "1234") {
            msg.style.color = "green";
            msg.textContent = "Acceso concedido ✔";

            localStorage.setItem("login", "true");

            card.classList.add("success");

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1200);

        } else {
            msg.style.color = "red";
            msg.textContent = "Credenciales incorrectas";
        }
    }, 1500);
});
