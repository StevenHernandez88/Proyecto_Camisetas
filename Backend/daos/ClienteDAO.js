const UsuarioDAO = require("./UsuarioDAO");
const db = require("../utils/Conexion");

class ClienteDAO extends UsuarioDAO {

    async getAllClientes() {
        try {
            console.log('Obteniendo todos los clientes');
            const response = await db.query('SELECT * FROM cliente');
            return response.rows;
        } catch (error) {
            console.error('Error al obtener Clientes:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }

    async createCliente(cliente) {
        try {
            // Llamar al método de creación de usuario base si es necesario
            await super.createUsuario(cliente);  // Asumiendo que hay un método en UsuarioDAO para crear un usuario

            const query = `
                INSERT INTO cliente (idcliente, direccion, telefono)
                VALUES ($1, $2, $3)
            `;
            const values = [
                cliente.idusuario,
                cliente.direccion,
                cliente.telefono
            ];
            await db.query(query, values);
            console.log("Cliente creado en la base de datos");
        } catch (error) {
            console.error(
                "Error al crear cliente:",
                error.message,
                error.stack
            );
            throw new Error("Error interno del servidor");
        }
    }

    async getInformacion(idusuario) {
        try {
            console.log("Obteniendo Cliente y su historial de compras");
            const response = await db.query(
                `Select u.idusuario, u.nombre, u.email, u.contraseña, u.fecha_creacion, 
                    cl.direccion, cl.telefono, r.funcion, cam.talla, cam.precio, es.url_imagen, 
                    mol.url_modelo
                from usuarios u
                join cliente cl on u.idusuario = cl.idcliente
                join rol r on u.rol_id = r.idrol
                join pedidos pe on cl.idcliente = pe.cliente_id
                join detallespedidos dp on pe.idpedidos = dp.pedido_id
                join camisetas cam on cam.idcamisetas = ANY(dp.camisetas)
                join estampas es on cam.estampa_id = es.idestampas
                join modelo mol on cam.modelo_id = mol.idmodelo
                where u.idusuario = $1`,
                [idusuario]
            );
    
            if (response.rows.length === 0) {
                console.log('Usuario no encontrado');
                return null;
            }
    
            // Agrupar historial de compras
            const clienteInfo = {
                idusuario: response.rows[0].idusuario,
                nombre: response.rows[0].nombre,
                email: response.rows[0].email,
                direccion: response.rows[0].direccion,
                telefono: response.rows[0].telefono,
                historialCompras: response.rows.map(compra => ({
                    talla: compra.talla,
                    precio: compra.precio,
                    url_imagen: compra.url_imagen,
                    url_modelo: compra.url_modelo
                }))
            };
    
            return clienteInfo;
        } catch (error) {
            console.error("Error al obtener Cliente:", error.message, error.stack);
            throw new Error("Error interno del servidor");
        }
    }
    
}

module.exports = ClienteDAO;
