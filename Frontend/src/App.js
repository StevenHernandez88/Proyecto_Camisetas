import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import 'boxicons';
import CustomizeTshirt from './pages/CustomizeTshirt';
import Checkout from './pages/Checkout';
import UploadStamp from './pages/UploadStamp';
import RegistrarUsuario from './components/RegistrarUsuario';
import LoginUsuario from './components/LoginUsuario';
import Rating  from './pages/Rating';
import UploadModel from './pages/UploadModel';


import MostrarEstampas from './pages/MostrarEstampas';
import MostrarModelos from './pages/MostrarModelos';

import Header from './components/Header';
import Carrito from './components/Carrito'; // Mantenemos la importación

// Importa el DataProvider
import { DataProvider } from './services/DataProvider'; 


import PerfilHistorialCompra from './pages/PerfilHistorialCompra';
import PerfilEstampasSubidas from './pages/PerfilEstampasSubidas';


import RecuperarContraseña from './pages/RecuperarContraseña';
import CambiarContraseña from './pages/CambiarContraseña';

function App() {
  return (
    // Envuelve toda la aplicación dentro de DataProvider
    <DataProvider>
      <Router>
        <div className="App">
          <Header /> {/* Header siempre se renderiza */}
          <Carrito /> {/* Carrito también siempre está presente */}
          <div className="App-content">
            <Routes>
              <Route path="/" element={<MostrarModelos />} />
              <Route path="/estampas" element={<MostrarEstampas />} />
              <Route path="/uploadStamp" element={<UploadStamp />} /> 
              <Route path="/customize" element={<CustomizeTshirt />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/registrar" element={<RegistrarUsuario />} /> 
              <Route path="/login" element={<LoginUsuario />} />
              <Route path="/rating" element={<Rating />} />
              <Route path="/uploadModel" element={<UploadModel/>} />
              <Route path="/perfilHistorialCompra" element={<PerfilHistorialCompra/>} />
              <Route path="/perfilEstampasSubidas" element={<PerfilEstampasSubidas/>} />
              <Route path="/recuperarContraseña" element={<RecuperarContraseña/>} />
              <Route path="/cambiarContraseña" element={<CambiarContraseña/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
