
class Usuario {
    constructor(idusuario, nombre, email, contraseña, rol_id) {
        this.idusuario = idusuario;
        this.nombre = nombre;
        this.email = email;
        this.contraseña = contraseña;
        this.rol_id = rol_id;
    }
}

module.exports = Usuario;
