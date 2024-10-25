import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem('carrito');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [menu, setMenu] = useState(false);
  const [idusuario, setIdusuario] = useState(() => localStorage.getItem('idusuario') || null);
  const [rol_id, setrol_id] = useState(() => localStorage.getItem('rol_id') || null);
  const [email, setEmail] = useState(() => localStorage.getItem('email') || null);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    if (idusuario) localStorage.setItem('idusuario', idusuario);
    if (rol_id) localStorage.setItem('rol_id', rol_id);
    if (email) localStorage.setItem('email', email)
  }, [idusuario, rol_id, email]);

  const addToCart = (product) => {
    setCarrito((prevCarrito) => {
      const existingProductIndex = prevCarrito.findIndex(
        (item) => item.idmodelo === product.idmodelo && item.talla === product.talla
      );

      if (existingProductIndex !== -1) {
        // Si el producto ya existe, aumentamos la cantidad
        const updatedCarrito = [...prevCarrito];
        updatedCarrito[existingProductIndex].cantidad += 1;
        return updatedCarrito;
      } else {
        // Si es un nuevo producto, lo añadimos al carrito
        return [...prevCarrito, { ...product, cantidad: 1 }];
      }
    });
  };

  const increaseQuantity = (index) => {
    setCarrito((prevCarrito) => {
      const updatedCarrito = prevCarrito.map((item, i) => {
        if (i === index) {
          return { ...item, cantidad: item.cantidad + 1 };
        }
        return item;
      });
      return updatedCarrito;
    });
  };

  const decreaseQuantity = (index) => {
    setCarrito((prevCarrito) => {
      const updatedCarrito = prevCarrito.map((item, i) => {
        if (i === index && item.cantidad > 1) {
          return { ...item, cantidad: item.cantidad - 1 };
        }
        return item;
      });
      return updatedCarrito;
    });
  };

  const removeItem = (index) => {
    setCarrito((prevCarrito) => prevCarrito.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCarrito([]);
  };

  const handleLogin = (userId, userrol_id, userEmail) => {
    setIdusuario(userId);
    setrol_id(userrol_id);
    setEmail(userEmail);
  };

  const handleLogout = () => {
    setIdusuario(null);
    setrol_id(null);
    setEmail(null);
    localStorage.removeItem('idusuario');
    localStorage.removeItem('rol_id');
    localStorage.removeItem('email');
  };

  const value = {
    carrito,
    setCarrito,
    menu,
    setMenu,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    idusuario,
    rol_id,
    email,
    handleLogin,
    handleLogout,
  };

  return (
    <DataContext.Provider value={value}>
      {props.children}
    </DataContext.Provider>
  );
};
