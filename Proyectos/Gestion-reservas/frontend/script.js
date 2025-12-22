const API = "http://127.0.0.1:5000/reservas";

function crearReserva() {
    fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nombre: nombre.value,
            fecha: fecha.value,
            servicio: servicio.value
        })
    }).then(() => cargarReservas());
}

function cargarReservas() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            lista.innerHTML = "";
            data.forEach(r => {
                lista.innerHTML += `<li>
                    ${r.nombre} - ${r.servicio} (${r.estado})
                </li>`;
            });
        });
}

cargarReservas();
