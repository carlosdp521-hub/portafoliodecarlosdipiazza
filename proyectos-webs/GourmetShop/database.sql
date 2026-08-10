CREATE DATABASE IF NOT EXISTS GOURMET
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE GOURMET;

CREATE TABLE IF NOT EXISTS USUARIOS (
    ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    direccion VARCHAR(200) NULL,
    telefono VARCHAR(30) NULL,
    rol ENUM('cliente','admin') NOT NULL DEFAULT 'cliente',
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS PRODUCTOS (
    ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    precio DECIMAL(12,2) NOT NULL,
    cantidad_inventario INT UNSIGNED NOT NULL DEFAULT 0,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS CARRITO (
    ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    ID_usuario INT UNSIGNED NOT NULL,
    ID_producto INT UNSIGNED NOT NULL,
    cantidad INT UNSIGNED NOT NULL,
    monto_total DECIMAL(12,2) NOT NULL,
    UNIQUE KEY uq_carrito_usuario_producto (ID_usuario, ID_producto),
    CONSTRAINT fk_carrito_usuario FOREIGN KEY (ID_usuario) REFERENCES USUARIOS(ID) ON DELETE CASCADE,
    CONSTRAINT fk_carrito_producto FOREIGN KEY (ID_producto) REFERENCES PRODUCTOS(ID) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS PEDIDOS (
    ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT UNSIGNED NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    direccion_envio VARCHAR(250) NOT NULL,
    monto_total DECIMAL(12,2) NOT NULL,
    estado ENUM('Pendiente','Preparando','Enviado','Entregado','Cancelado') NOT NULL DEFAULT 'Pendiente',
    CONSTRAINT fk_pedido_usuario FOREIGN KEY (usuario_id) REFERENCES USUARIOS(ID) ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS DETALLE_PEDIDO (
    ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT UNSIGNED NOT NULL,
    producto_id INT UNSIGNED NOT NULL,
    cantidad INT UNSIGNED NOT NULL,
    precio_unitario DECIMAL(12,2) NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,
    CONSTRAINT fk_detalle_pedido FOREIGN KEY (pedido_id) REFERENCES PEDIDOS(ID) ON DELETE CASCADE,
    CONSTRAINT fk_detalle_producto FOREIGN KEY (producto_id) REFERENCES PRODUCTOS(ID) ON DELETE RESTRICT
) ENGINE=InnoDB;

INSERT INTO PRODUCTOS (nombre, descripcion, categoria, precio, cantidad_inventario) VALUES
('Cabernet Sauvignon Reserva', 'Vino tinto reserva de perfil frutal y equilibrado.', 'Vino', 12990, 20),
('Malbec Selección', 'Vino tinto de cuerpo medio, ideal para carnes y quesos.', 'Vino', 10990, 18),
('Queso Manchego Curado', 'Queso curado de sabor intenso y textura firme.', 'Queso', 8990, 25),
('Queso Brie Artesanal', 'Queso de pasta blanda, suave y cremoso.', 'Queso', 7490, 16),
('Chocolate 70% Cacao', 'Chocolate amargo de alta concentración de cacao.', 'Chocolate', 4990, 30),
('Bombones Gourmet', 'Selección de bombones rellenos para regalo.', 'Chocolate', 6990, 22)
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);
