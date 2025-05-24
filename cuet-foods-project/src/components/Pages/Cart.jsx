import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    try {
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];
      if (Array.isArray(parsedCart)) {
        setCartItems(parsedCart);
      } else {
        console.error("Invalid cart data in localStorage. Resetting cart.");
        localStorage.setItem("cart", JSON.stringify([]));
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error parsing cart data from localStorage:", error);
      localStorage.setItem("cart", JSON.stringify([]));
      setCartItems([]);
    }
  }, []);

  // Update cart in localStorage and state, show toast on change
  const updateQuantity = (id, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Removed from cart",
      showConfirmButton: false,
      timer: 1000,
      toast: true,
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Your cart is empty",
        timer: 1500,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Checkout successful!",
      text: `You have purchased ${cartItems.length} item(s) for ৳${totalPrice}.`,
      timer: 2000,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
    });
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="w-10/12 mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="mb-4 p-4 border rounded flex flex-col md:flex-row justify-between items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.foodImage}
                    alt={item.foodName}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{item.foodName}</h2>
                    <p className="text-sm text-gray-500">Price: ৳{item.price}</p>
                    <p className="text-sm text-gray-500">
                      Subtotal: ৳{item.price * item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item._id, Math.max(item.quantity - 1, 1))
                    }
                    className="btn btn-sm btn-outline"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        Math.min(item.quantity + 1, item.foodQuantity)
                      )
                    }
                    className="btn btn-sm btn-outline"
                    disabled={item.quantity >= item.foodQuantity}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="btn btn-sm btn-error"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right space-y-4">
            <h2 className="text-xl font-bold">Total: ৳{totalPrice}</h2>
            <button
              onClick={handleCheckout}
              className="btn bg-[#89b758] text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
