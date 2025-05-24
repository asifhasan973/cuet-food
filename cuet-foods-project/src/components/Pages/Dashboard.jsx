import React, { useEffect, useContext } from 'react';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Authprovider/Authprovider';
import { UserContext } from '../Authprovider/UserContext.jsx';

const VendorDashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleSignOut = async () => {
    try {
      await logout();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'You have been logged out successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/login');
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  console.log('User ID in Dashboard:', userId);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#f1f1f1] min-h-screen p-4">
        <div className="text-xl font-bold mb-4">Vendor Dashboard</div>
        <ul className="space-y-4">
          
          <li>
            <NavLink to="products" className={({ isActive }) => isActive ? 'text-yellow-400' : ''}>
              Your Products
            </NavLink>
          </li>
          <li>
            <NavLink to="orders" className={({ isActive }) => isActive ? 'text-yellow-400' : ''}>
              Orders
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleSignOut}
              className="text-lg hover:text-[#8fbf5b] text-left w-full"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default VendorDashboard;
