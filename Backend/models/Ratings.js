class Ratings{
    constructor(cliente_id, modelo_id, rating, comentario) {
        this.cliente_id = cliente_id;
        this.modelo_id = modelo_id;
        this.rating = rating;
        this.comentario = comentario;
    }
}

module.exports = Ratings;