import React, { useState } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import axios from "axios";
import "boxicons"; 

const CambiarContraseña = () => {
  const location = useLocation();
  const email = location.state?.email || ""; // Obtener el email desde el estado
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [verificarContraseña, setVerificarContraseña] = useState("");
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const navigate = useNavigate();

  const cambiarContraseña = async () => {
    if (nuevaContraseña !== verificarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await axios.post("http://localhost:3000/cambiarContrasena", {
        email,
        contraseña: nuevaContraseña,
      });
      alert("Contraseña cambiada exitosamente");
      navigate('/');
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      alert("Error al cambiar la contraseña");
    }
  };

  return (
    <div className="cambiar-contraseña">
      <h2>Cambiar Contraseña</h2>
      <div>
        <label>Nueva Contraseña:</label>
        <div className="input-con-ico">
          <input
            type={mostrarContraseña ? "text" : "password"}
            value={nuevaContraseña}
            onChange={(e) => setNuevaContraseña(e.target.value)}
            required
          />
          <box-icon
            name={mostrarContraseña ? "show" : "hide"}
            onClick={() => setMostrarContraseña(!mostrarContraseña)}
          ></box-icon>
        </div>
      </div>
      <div>
        <label>Verificar Nueva Contraseña:</label>
        <div className="input-con-ico">
          <input
            type={mostrarContraseña ? "text" : "password"}
            value={verificarContraseña}
            onChange={(e) => setVerificarContraseña(e.target.value)}
            required
          />
          <box-icon
            name={mostrarContraseña ? "show" : "hide"}
            onClick={() => setMostrarContraseña(!mostrarContraseña)}
          ></box-icon>
        </div>
      </div>
      <button onClick={cambiarContraseña}>Cambiar Contraseña</button>
    </div>
  );
};

export default CambiarContraseña;
