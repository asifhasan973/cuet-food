import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import FrontPage from "./components/FrontPage.jsx";
import { AuthProvider } from "./components/Authprovider/Authprovider.jsx";
import Login from "./components/Authentications/Login.jsx";
import Register from "./components/Authentications/Register.jsx";
import AvailableFoods from "./components/Pages/AvailableFoods.jsx";
import AvailableVendors from "./components/Pages/AvailableVendors.jsx";
import Cart from "./components/Pages/Cart.jsx";
import Dashboard from "./components/Pages/Dashboard.jsx";
import DashboardProducts from "./components/Dashboard/DashboardProducts.jsx";
import DashboardHome from "./components/Dashboard/DashboardHome.jsx";
import DashboardOrders from "./components/Dashboard/DashboardOrders.jsx";
import DashboardSettings from "./components/Dashboard/DashboardSettings.jsx";
import UserProvider from "./components/Authprovider/UserContext.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
    {
  path: '/AvailableFoods',
  element: <AvailableFoods />,
  loader: async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/asifhasan973/All_jsons/refs/heads/main/foods_main');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
      return []; // or throw error to show error boundary
    }
  }
},
      {
        path: '/AvailableVendors',
        element: <AvailableVendors></AvailableVendors>,
        
      },
      {
        path: '/Cart',
        element: <Cart></Cart>,
        
      },
    
    ],
  },
  {
    path: '/Dashboard',
    element: <Dashboard></Dashboard>,
    children: [
     
      {
        path: 'products',
        element: <DashboardProducts></DashboardProducts>,
      },
      {
        path: 'orders',
        element: <DashboardOrders></DashboardOrders>,
      },
      {
        path: 'settings',
        element: <DashboardSettings></DashboardSettings>,
      },
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </UserProvider>
  </StrictMode>
);
