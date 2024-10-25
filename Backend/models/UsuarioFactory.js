const Cliente = require('./Cliente');
const Artista = require('./Artista');

class UsuarioFactory{
    static createUsuario(tipo, datos) {
        switch (tipo) {
            case 'cliente':
                return new Cliente(...datos);
            case 'artista':
                return new Artista(...datos);
            default:
                throw new Error('Tipo no soportado');
        }
    }
}

module.exports = UsuarioFactory;
