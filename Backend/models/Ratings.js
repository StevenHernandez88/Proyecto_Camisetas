class Ratings{
    constructor(usuario_id, modelo_id, rating, comentario) {
        this.usuario_id = usuario_id;
        this.modelo_id = modelo_id;
        this.rating = rating;
        this.comentario = comentario;
    }
}

module.exports = Ratings;