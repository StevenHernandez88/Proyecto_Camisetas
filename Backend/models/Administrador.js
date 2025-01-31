const Usuario = require('./Usuario');

class Administrador extends Usuario {
    constructor(idusuario, nombre, email, contraseña, rol_id, permisos_especiales) {
        super(idusuario, nombre, email, contraseña, rol_id);
        this.permisos_especiales = permisos_especiales;
    }
}

module.exports = Administrador;
