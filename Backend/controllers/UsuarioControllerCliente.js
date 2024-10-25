const ClienteDAO = require('../daos/ClienteDAO');
const UsuarioFactory = require('../models/UsuarioFactory');
const enviarCorreo = require('../utils/nodemailer').enviarCorreo;
const generarPassword = require('../utils/generarPassword'); 

const clienteDAO = new ClienteDAO();


const getClientes = async (req, res) => {
    try {
        const clientes = await clienteDAO.getAllClientes();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};



const crearUsuarioCliente = async (req, res) => {
    try {
        //console.log('Datos recibidos en el body:', req.body);
        const { idusuario, nombre, email, rol_id, direccion, telefono } = req.body;
        const constraseña = generarPassword(idusuario, nombre);

        const cliente = UsuarioFactory.createUsuario('cliente', [idusuario, nombre, email, constraseña, rol_id, direccion, telefono]);
        
        //console.log('Objeto Cliente creado:', Cliente);
        
        await clienteDAO.createCliente(cliente);

        //console.log('Cliente insertado en la base de datos');
        
        enviarCorreo(email, constraseña);

        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error en crearUsuarioCliente:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const getInformacionCliente = async (req, res) => {
    try {
        const { idusuario } = req.body;
        const cliente = await clienteDAO.getInformacion(idusuario);
        
        if (!cliente) {
            return res.status(401).json({ message: 'No existe Cliente' });
        }

        res.status(200).json(cliente);
    } catch (error) {
        console.error('Error para obtener Cliente:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};



module.exports = {
    getClientes,
    crearUsuarioCliente,
    getInformacionCliente
};
