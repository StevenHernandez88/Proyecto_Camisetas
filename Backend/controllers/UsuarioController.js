const UsuarioDAO = require('../daos/UsuarioDAO');
const enviarCodigoVerificacion = require('../utils/nodemailer').enviarCorreoRecuperacion;
const generarCodigo = require('../utils/generarCodigo');

const usuarioDAO = new UsuarioDAO();

const codigosVerificacion = {};

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

const cambiarContrasena = async (req, res) => {
    try {
        //console.log('Datos recibidos en el body:', req.body);
        const { email, contraseña } = req.body;
        await usuarioDAO.cambiarContraseña(email, contraseña);
        res.status(200).json("Se cambio la contraseña satisfactoriamente");
    } catch (error) {
        console.error('Error en loginUsuario:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const generarCodigoVerificacion = async (req, res) => {
    try {
        let { email } = req.body;
        email = email.trim().toLowerCase(); // Sanear el email

        const codigo = generarCodigo();
        codigosVerificacion[email] = codigo; 
        console.log(`Código generado para ${email}: ${codigo}`); // Registro de depuración
        enviarCodigoVerificacion(email, codigo);
        res.status(200).json("Se envió el código de verificación");
    } catch (error) {
        console.error('Error en generarCodigoVerificacion:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const verificarCodigo = (req, res) => {
    try {
        let { email, codigo } = req.body;
        email = email.trim().toLowerCase(); // Sanear el email
        //console.log('Datos recibidos en el body:', req.body);
        //console.log('Código almacenado:', codigosVerificacion[email]);

        if (codigosVerificacion[email] && codigosVerificacion[email].toString() === codigo.toString()) {
            // El código es correcto, eliminar el código almacenado
            delete codigosVerificacion[email];
            res.status(200).json("Código verificado correctamente");
        } else {
            res.status(400).json({ error: "Código de verificación incorrecto" });
        }
    } catch (error) {
        console.error("Error al verificar el código:", error.message, error.stack);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = {
    getUsuario,
    login,
    cambiarContrasena,
    generarCodigoVerificacion,
    verificarCodigo
};
