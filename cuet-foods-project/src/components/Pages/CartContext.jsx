import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, quantity) => {
    setCart((prevCart) => {
      const currentQty = prevCart[item._id]?.quantity || 0;
      const newQty = currentQty + quantity;
      if (newQty > Number(item.foodQuantity)) {
        alert(`Cannot add more than available stock (${item.foodQuantity})`);
        return prevCart;
      }
      return {
        ...prevCart,
        [item._id]: { ...item, quantity: newQty },
      };
    });
  };

  const updateQuantity = (itemId, quantity) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        const { [itemId]: _, ...rest } = prevCart;
        return rest;
      }
      return {
        ...prevCart,
        [itemId]: { ...prevCart[itemId], quantity },
      };
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const { [itemId]: _, ...rest } = prevCart;
      return rest;
    });
  };

  const clearCart = () => setCart({});

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
