const ArtistaDAO = require('../daos/ArtistaDAO');
const UsuarioFactory = require('../models/UsuarioFactory');
const enviarCorreo = require('../utils/nodemailer').enviarCorreo;
const generarPassword = require('../utils/generarPassword'); 

const artistaDAO = new ArtistaDAO();

const getArtistas = async (req, res) => {
    try {
        const artista = await artistaDAO.getAllArtista();
        res.status(200).json(artista);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const crearUsuarioArtista = async (req, res) => {
    try {
        console.log('Datos recibidos en el body:', req.body);
        const { idusuario, nombre, email, rol_id, biografia } = req.body;
        const contraseña = generarPassword(idusuario, nombre);

        const artista = UsuarioFactory.createUsuario('artista', [idusuario, nombre, email, contraseña, rol_id, biografia]);
        
        console.log('Objeto artista creado:', artista);

        await artistaDAO.createArtista(artista);

        console.log('Artista insertado en la base de datos');

        enviarCorreo(email, artista.contraseña);

        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const getInformacionArtista = async (req, res) => {
    try {
      const { idusuario } = req.body;
      const artista = await artistaDAO.getInformacion(idusuario);
  
      if (!artista) {
        return res.status(401).json({ message: 'No existe Artista' });
      }
  
      res.status(200).json(artista);
    } catch (error) {
      console.error('Error para obtener Artista:', error.message, error.stack);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  

module.exports = {
    getArtistas,
    crearUsuarioArtista,
    getInformacionArtista
};
