const Usuario = require('./Usuario');

class Cliente extends Usuario {
    constructor(idusuario, nombre, email, contraseña, rol_id, direccion, telefono) {
        super(idusuario, nombre, email, contraseña, rol_id);
        this.direccion = direccion;
        this.telefono = telefono;
    }
}

module.exports = Cliente;
