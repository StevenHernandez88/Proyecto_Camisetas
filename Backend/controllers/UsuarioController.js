const UsuarioDAO = require('../daos/UsuarioDAO');

const usuarioDAO = new UsuarioDAO();

const getUsuario = async (req, res) => {
    try {
        const usuarios = await usuarioDAO.getAllUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const login = async (req, res) => {
    try {
        const { email, contraseña } = req.body;
        const usuario = await usuarioDAO.getUsuarioByEmailAndPassword(email, contraseña);
        
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        res.status(200).json({idusuario: usuario.idusuario, rol_id: usuario.rol_id, email: usuario.email});
    } catch (error) {
        console.error('Error en loginUsuario:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getUsuario,
    login
};
