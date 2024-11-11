function generarPassword(idusuario, nombre) {
    const primeraLetraNombre = nombre.charAt(0);
    const password = `${idusuario}${primeraLetraNombre}`;
    return password;
  }
  
  module.exports = generarPassword;
  