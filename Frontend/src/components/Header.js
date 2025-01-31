import React, { useContext, useState } from 'react';
import BlancaAlgodon from '../img/Blanca_algodon.jpg';
import { DataContext } from "../services/DataProvider";
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { carrito, menu, setMenu, idusuario, rol_id, handleLogout } = useContext(DataContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenu(!menu);
  };

  // Calcular la cantidad total de productos en el carrito
  const itemsCount = carrito.reduce((total, item) => total + item.cantidad, 0);

  // Manejar logout
  const handleLogoutClick = () => {
    handleLogout();  // Deslogear usuario
    navigate('/');  // Redirigir a la página de inicio
  };

  const handleProfileClick = () => {
  
    const role = Number(rol_id); // Convertir rol_id a número
    
    if (idusuario) {
      if(role === 1){
        //console.log('Redirigiendo a /admin');
        navigate('/admin');
      }
      if (role === 2) {
        //console.log('Redirigiendo a /perfilHistorialCompra');
        navigate('/perfilHistorialCompra');
      } else if (role === 3) {
        //console.log('Redirigiendo a /perfilEstampasSubidas');
        navigate('/perfilEstampasSubidas');
      } else {
        console.log('Rol no reconocido');
      }
    } else {
      console.log('Usuario no autenticado, redirigiendo a login');
      navigate('/login');
    }
  };
  
  


  return (
    <header>
      <a href='#'>
        <div className='logo'>
          <img src={BlancaAlgodon} alt="logo" width="100"></img>
        </div>
      </a>
      <ul>
        <li><a href='/'>INICIO</a></li>
        {!idusuario ? (
          <>
            <li><a href='/login'>INICIAR SESIÓN</a></li>
            <li><a href='/registrar'>REGISTRAR</a></li>
          </>
        ) : (
          <li><a href='#' onClick={handleLogoutClick}>CERRAR SESIÓN</a></li>
        )}
      </ul>

      {idusuario && rol_id && (
        <div className="user-icon" onClick={handleProfileClick}>
          <box-icon name="user-circle" size="lg"></box-icon>
        </div>
      )}

      <div className='cart' onClick={toggleMenu}>
        <box-icon name="cart"></box-icon>
        <span className='item_total'>{itemsCount}</span>
      </div>
    </header>
  );
}

export default Header;
