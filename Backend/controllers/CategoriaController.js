const CategoriaDAO = require('../daos/CategoriaDAO');

const categoriasDAO = new CategoriaDAO();

const getCategorias = async (req, res) => {
    try {
        const categorias = await categoriasDAO.getAllCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const crearCategoria = async (req, res) => {
    try {
        const {cliente_id, total, estado_id} = req.body;
        
        const categoria = { cliente_id, total, estado_id};

        const idcategorias = await categoriasDAO.createCategoria(categoria); // Esperar el ID del nuevo categoria

        res.status(200).json({ idcategorias }); // Devolver el ID del categoria creado
        console.log('ID del categoria devuelto:', idcategorias); // Imprimir el ID del categoria
    } catch (error) {
        console.error('Error en crearcategoria:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


module.exports = {
    getCategorias,
    crearCategoria
};
