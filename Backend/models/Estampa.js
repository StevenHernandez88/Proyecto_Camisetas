class Estampa{
    constructor(nombre, descripcion, artista_id, url_imagen, categoria_id, activo) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.artista_id = artista_id;
        this.url_imagen = url_imagen;
        this.categoria_id = categoria_id;
        this.activo = activo;
    }
    
}

module.exports = Estampa;