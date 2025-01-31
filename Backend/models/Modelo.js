class Modelo{
    constructor( descripcion, material, rating_id, url_modelo, stock, activo) {
        this.descripcion = descripcion;
        this.material = material;
        this.rating_id = rating_id;
        this.url_modelo = url_modelo;
        this.stock = stock
        this.activo = activo
    }
    
}

module.exports = Modelo;