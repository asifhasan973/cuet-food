import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Authprovider/Authprovider";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  // Update cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    let cart = [];
    if (storedCart) {
      try {
        cart = JSON.parse(storedCart);
        if (!Array.isArray(cart)) {
          cart = [];
        }
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        cart = [];
      }
    }
    setCartItems(cart);
    setTotalItems(cart.reduce((sum, item) => sum + (item.quantity || 0), 0));
  }, []);

  // Update total items on cart change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(total);
  }, [cartItems]);

  const links = (
    <>
      <NavLink className="font-bold mx-4 text-base" to="/">
        Home
      </NavLink>
      <NavLink className="font-bold mx-4 text-base" to="/AvailableFoods">
        Available Foods
      </NavLink>
      <NavLink className="font-bold mx-4 text-base" to="/AvailableVendors">
        Available Vendors
      </NavLink>
      <NavLink className="font-bold mx-4 text-base" to="/Cart">
        Cart
        {totalItems > 0 && (
          <span className="ms-3 bg-red-500 text-white text-xs rounded-full px-2 py-1">
            {totalItems}
          </span>
        )}
      </NavLink>
    </>
  );

  const handleSignOut = () => {
    logout().then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "You have been logged out",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  const defaultPhoto =
    "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg";

  return (
    <div className="navbar w-10/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="text-xl protest-guerrilla-regular md:text-4xl">
          Bite Me CUET
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {currentUser ? (
          <>
            <div className="avatar hidden lg:flex">
              <div className="w-12 rounded-full overflow-hidden">
                <img
                  src={currentUser.photoURL || defaultPhoto}
                  alt="User Avatar"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = defaultPhoto;
                  }}
                />
              </div>
            </div>

            <button onClick={handleSignOut} className="hover:underline mx-4 font-bold">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline mx-4 font-bold">
              Login
            </Link>
            <Link to="/register" className="hover:underline text-[#85be48] font-bold" mx-4>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
