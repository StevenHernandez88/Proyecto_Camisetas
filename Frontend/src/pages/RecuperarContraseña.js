import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RecuperarContraseña = () => {
  const [email, setEmail] = useState("");
  const [codigoVerificacion, setCodigoVerificacion] = useState("");
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const navigate = useNavigate();

  const enviarCodigo = async () => {
    try {
      await axios.post("http://localhost:3000/generarCodigoVerificacion", { email });
      setCodigoEnviado(true);
      alert("Código de verificación enviado a tu correo");
    } catch (error) {
      console.error("Error al enviar el código:", error);
      alert("Error al enviar el código");
    }
  };

  const verificarCodigo = async () => {
    try {
      const response = await axios.post("http://localhost:3000/verificarCodigo", { email, codigo: codigoVerificacion });
      if (response.status === 200) {
        navigate("/cambiarContraseña", { state: { email } });
      } else {
        alert("Código de verificación inválido");
      }
    } catch (error) {
      console.error("Error al verificar el código:", error);
      alert("Error al verificar el código");
    }
  };

  return (
    <div className="recuperar-contraseña">
      <h2>Recuperar Contraseña</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button onClick={enviarCodigo}>Enviar Código</button>
      </div>

      {codigoEnviado && (
        <div>
          <label>Código de Verificación:</label>
          <input
            type="text"
            value={codigoVerificacion}
            onChange={(e) => setCodigoVerificacion(e.target.value)}
            required
          />
          <button onClick={verificarCodigo}>Verificar Código</button>
        </div>
      )}
    </div>
  );
};

export default RecuperarContraseña;
