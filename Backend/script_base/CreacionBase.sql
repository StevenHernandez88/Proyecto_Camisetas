
-- Crear tabla rol
CREATE TABLE Rol(
    idRol INT PRIMARY KEY,
    funcion VARCHAR(50) NOT NULL CHECK (funcion IN ('cliente', 'artista', 'administrador'))
);

-- Creación de la tabla de usuarios
CREATE TABLE usuarios (
    idusuario INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    rol_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creación de la tabla de clientes
CREATE TABLE cliente (
    idcliente INT PRIMARY KEY,
    direccion VARCHAR(255),
    telefono VARCHAR(20)
);

-- Creación de la tabla de artistas
CREATE TABLE artista (
    idartista INT PRIMARY KEY,
    biografia TEXT
);

-- Creación de la tabla de administradores
CREATE TABLE administrador (
    idadministrador INT PRIMARY KEY,
    permisos_especiales BOOLEAN DEFAULT TRUE,
    modelo_id INT
);

-- Creación de la tabla de estampas
CREATE TABLE estampas (
    idestampas SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    artista_id INT,
    url_imagen TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    categoria_id INT,
    activo BOOLEAN
);

-- Creación de la tabla de camisetas
CREATE TABLE camisetas (
    idcamisetas SERIAL PRIMARY KEY,
	modelo_id INT,
    estampa_id INT,
    talla VARCHAR(10) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creación de la tabla estados
CREATE TABLE estado(
    idestado SERIAL PRIMARY KEY,
    descripcionestado TEXT
);

-- Creación de la tabla de pedidos
CREATE TABLE pedidos (
    idpedidos SERIAL PRIMARY KEY,
    cliente_id INT,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total INT NOT NULL,
    estado_id INT
);


-- Creación de la tabla de detalles de pedidos
CREATE TABLE detallesPedidos (
    iddetalles_pedidos SERIAL PRIMARY KEY,
    pedido_id INT,
    camiseta_id INT,
    cantidad INT NOT NULL,
    precio_unitario INT
);


-- Creación de la tabla de modelo
CREATE TABLE modelo(
    idmodelo SERIAL PRIMARY KEY,
    descripcion TEXT,
	material TEXT,
    rating_id INT,
    url_modelo TEXT,
    stock INT,
    activo BOOLEAN
);


-- Crear tabla categoria
CREATE TABLE categoria (
    idcategoria INT PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL CHECK (descripcion IN (
        'terror', 
        'comedia', 
        'romance', 
        'aventura', 
        'fantasía', 
        'ciencia ficción', 
        'acción', 
        'drama', 
        'musical', 
        'histórico', 
        'deporte', 
        'animación', 
        'arte', 
        'naturaleza', 
        'viajes', 
        'abstracto', 
        'retro', 
        'futurista', 
        'anime', 
        'videojuegos', 
        'superhéroes'
    ))
);


-- Creación de la tabla de ratings
CREATE TABLE ratings (
    idratings SERIAL PRIMARY KEY,
    cliente_id INT,
    modelo_id INT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comentario TEXT,
    fecha_rating TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES cliente(idcliente),
    FOREIGN KEY (modelo_id) REFERENCES modelo(idmodelo)
);