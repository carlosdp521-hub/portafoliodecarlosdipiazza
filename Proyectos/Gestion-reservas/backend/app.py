from flask import Flask, request, jsonify
from modelos import GestorReservas

app = Flask(__name__)
gestor = GestorReservas()

@app.route("/reservas", methods=["GET"])
def obtener_reservas():
    return jsonify(gestor.listar_reservas())

@app.route("/reservas", methods=["POST"])
def crear_reserva():
    data = request.json
    reserva = gestor.crear_reserva(
        data["nombre"],
        data["fecha"],
        data["servicio"]
    )
    return jsonify(reserva.to_dict()), 201

@app.route("/reservas/<int:id>", methods=["DELETE"])
def cancelar_reserva(id):
    if gestor.cancelar_reserva(id):
        return jsonify({"mensaje": "Reserva cancelada"})
    return jsonify({"error": "Reserva no encontrada"}), 404

if __name__ == "__main__":
    app.run(debug=True)
