function generarPassword(idUsuario, nombre) {
    const primeraLetraNombre = nombre.charAt(0);
    const password = `${idUsuario}${primeraLetraNombre}`;
    return password;
  }
  
  module.exports = generarPassword;
  