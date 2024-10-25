class DetallesPedidos{
    constructor(pedido_id, camisetas, cantidad, precio_unitario) {
        this.pedido_id = pedido_id;
        this.camiseta_id = camisetas;
        this.cantidad = cantidad;
        this.precio_unitario = precio_unitario;

    }
    
}

module.exports = DetallesPedidos;
