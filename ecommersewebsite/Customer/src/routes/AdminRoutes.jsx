import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import { Navigate } from 'react-router-dom';
import { adminAuthLoader } from './adminAuthLoader';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminSignup from '../pages/admin/AdminSignup';
import ProtectedRoute from './ProtectedRoute';
import Orders from "../pages/admin/Orders";

const AdminRoutes = {
  path: '/admin',
  children: [
    { 
      path: 'login', 
      element: <AdminLogin /> 
    },
    { 
      path: 'signup', 
      element: <AdminSignup /> 
    },
    {
      path: '',
      element: (
        <ProtectedRoute adminOnly>
          <AdminLayout />
        </ProtectedRoute>
      ), 
      loader: adminAuthLoader,
      children: [
        { 
          index: true, 
          element: <Navigate to="dashboard" replace /> 
        },
        { 
          path: 'dashboard', 
          element: <AdminDashboard /> 
        },
        { path: "orders", element: <Orders /> },
      ]
    }
  ]
};

export default AdminRoutes;