const Usuario = require('./Usuario');

class Artista extends Usuario {
    constructor(idusuario, nombre, email, contraseña, rol_id, biografia) {
        super(idusuario, nombre, email, contraseña, rol_id);
        this.biografia = biografia;
    }
}

module.exports = Artista;
