import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // Información local
  const [storeInfo] = useState({
    price: 44000,
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    paymentMethods: ['Tarjeta de crédito', 'PayPal', 'Transferencia bancaria'],
    materials: ['algodón', 'poliéster'],
    artistFeatures: `Como artista, puedes subir, eliminar y administrar los diseños de tus estampas. Además, puedes hacerlas disponibles para la venta.`,
    generalInfo: `Este portal permite visualizar un catálogo de camisetas en el que un usuario puede personalizar el estampado dentro de una oferta de diseños proporcionados por artistas o diseñadores.`,
    contact: 'Llama al +57 304 455 40 66 si necesitas ayuda',
  });

  const toggleChat = () => {
    setIsOpen(!isOpen);

    // Si el chat se abre y no hay mensajes aún, enviamos automáticamente el saludo inicial
    if (!isOpen && messages.length === 0) {
      setMessages([{ text: '¡Hola! ¿En qué puedo ayudarte hoy?', sender: 'bot' }]);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    let botResponse = '';
    const lowerMessage = inputMessage.toLowerCase();

    // Respuestas predefinidas
    if (lowerMessage.includes('buenas') || lowerMessage.includes('tengo una duda') || lowerMessage.includes('necesito ayuda')) {
      botResponse = `¡Hola! ¿En qué puedo ayudarte hoy?`;
    } else if (lowerMessage.includes('precio')) {
      botResponse = `El precio de las camisetas es de ${storeInfo.price} pesos colombianos.`;
    } else if (lowerMessage.includes('tallas')) {
      botResponse = `Las tallas disponibles son: ${storeInfo.availableSizes.join(', ')}.`;
    } else if (lowerMessage.includes('pago')) {
      botResponse = `Los métodos de pago disponibles son: ${storeInfo.paymentMethods.join(', ')}.`;
    } else if (lowerMessage.includes('artista') || lowerMessage.includes('funciones como artista')) {
      botResponse = storeInfo.artistFeatures;
    } else if (lowerMessage.includes('materiales') || lowerMessage.includes('camisetas')) {
      botResponse = `Actualmente contamos con camisetas en los siguientes materiales: ${storeInfo.materials.join(' y ')}.`;
    } else if (lowerMessage.includes('información general') || lowerMessage.includes('empresa') || lowerMessage.includes('quienes son ustedes')) {
      botResponse = storeInfo.generalInfo;
    } else if (lowerMessage.includes('cantidad maxima') || lowerMessage.includes('maxima')) {
      botResponse = `La cantidad maxima de camisetas es de 100 camisetas`;
    }else if (lowerMessage.includes('estampado') || lowerMessage.includes('estampado personalizado') || lowerMessage.includes('personalizado') || lowerMessage.includes('personalizar')){
      botResponse = `Claro que si, puedes personalizar los modelos con las estampas de los artistas`;
    }else if (lowerMessage.includes('escoger estampas') || lowerMessage.includes('estampas propias') || lowerMessage.includes('mis propias estampas') || lowerMessage.includes('las mias')){
      botResponse = `Lamentablemente solamente se pueden seleccionar estampas de artistas, sin embargo hay diseños muy bonitos`;
    }else if (lowerMessage.includes('poner estampas') || lowerMessage.includes('incluir estampas') || lowerMessage.includes('poner mis estampas')){
      botResponse = `Claro que si, pero tienes que ser un artista con bastante experiencia`;
    }else {
      botResponse = storeInfo.contact;
    }

    // Actualizamos los mensajes
    setMessages([...messages, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');

    // Simulamos la respuesta del bot
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="chat-bot-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Chat de preguntas</h3>
            <button onClick={toggleChat} className="close-button"><X size={20} /></button>
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
      <button onClick={toggleChat} className="chat-icon">
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

export default ChatBot;
