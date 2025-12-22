"""
Sistema de Gestión de Reservas
Autor: Carlos Di Piazza
Asignatura: Introducción a la Programación
Institución: IACC

Descripción:
Sistema desarrollado en Python utilizando Programación Orientada a Objetos (POO),
que permite crear, buscar, listar y cancelar reservas.
"""

# =============================
# CLASE RESERVA
# =============================

class Reserva:
    def __init__(self, id_reserva, nombre, fecha, servicio):
        self.id = id_reserva
        self.nombre = nombre
        self.fecha = fecha
        self.servicio = servicio
        self.estado = "Activa"

    def cancelar(self):
        self.estado = "Cancelada"

    def __str__(self):
        return (
            f"ID: {self.id} | Cliente: {self.nombre} | "
            f"Fecha: {self.fecha} | Servicio: {self.servicio} | "
            f"Estado: {self.estado}"
        )


# =============================
# CLASE GESTOR DE RESERVAS
# =============================

class GestorReservas:
    def __init__(self):
        self.reservas = []
        self.contador_id = 1

    def crear_reserva(self):
        nombre = input("Nombre del cliente: ")
        fecha = input("Fecha (DD/MM/AAAA): ")
        servicio = input("Servicio reservado: ")

        reserva = Reserva(self.contador_id, nombre, fecha, servicio)
        self.reservas.append(reserva)
        self.contador_id += 1

        print("✅ Reserva creada con éxito\n")

    def mostrar_reservas(self):
        if not self.reservas:
            print("⚠️ No existen reservas registradas\n")
        else:
            for r in self.reservas:
                print(r)
            print()

    def buscar_reserva(self):
        id_buscar = int(input("Ingrese ID de la reserva: "))
        for r in self.reservas:
            if r.id == id_buscar:
                print(r, "\n")
                return
        print("❌ Reserva no encontrada\n")

    def cancelar_reserva(self):
        id_cancelar = int(input("Ingrese ID de la reserva a cancelar: "))
        for r in self.reservas:
            if r.id == id_cancelar:
                r.cancelar()
                print("🛑 Reserva cancelada\n")
                return
        print("❌ Reserva no encontrada\n")


# =============================
# MENÚ PRINCIPAL
# =============================

def menu():
    gestor = GestorReservas()

    while True:
        print("=== SISTEMA DE GESTIÓN DE RESERVAS ===")
        print("1. Crear reserva")
        print("2. Mostrar reservas")
        print("3. Buscar reserva")
        print("4. Cancelar reserva")
        print("5. Salir")

        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            gestor.crear_reserva()
        elif opcion == "2":
            gestor.mostrar_reservas()
        elif opcion == "3":
            gestor.buscar_reserva()
        elif opcion == "4":
            gestor.cancelar_reserva()
        elif opcion == "5":
            print("👋 Saliendo del sistema...")
            break
        else:
            print("⚠️ Opción inválida\n")


menu()
