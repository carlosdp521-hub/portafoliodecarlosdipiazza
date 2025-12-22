class Reserva:
    def __init__(self, id_reserva, nombre, fecha, servicio):
        self.id = id_reserva
        self.nombre = nombre
        self.fecha = fecha
        self.servicio = servicio
        self.estado = "Activa"

    def cancelar(self):
        self.estado = "Cancelada"

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "fecha": self.fecha,
            "servicio": self.servicio,
            "estado": self.estado
        }


class GestorReservas:
    def __init__(self):
        self.reservas = []
        self.contador_id = 1

    def crear_reserva(self, nombre, fecha, servicio):
        reserva = Reserva(self.contador_id, nombre, fecha, servicio)
        self.reservas.append(reserva)
        self.contador_id += 1
        return reserva

    def listar_reservas(self):
        return [r.to_dict() for r in self.reservas]

    def cancelar_reserva(self, id_reserva):
        for r in self.reservas:
            if r.id == id_reserva:
                r.cancelar()
                return True
        return False
