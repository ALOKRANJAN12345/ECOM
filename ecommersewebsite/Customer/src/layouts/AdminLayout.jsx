import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div 
        className="flex-1 p-8" 
        style={{ 
          backgroundColor: '#F97316', // Orange background
          color: '#111827' 
        }}
      >
        <div 
          className="mb-8 p-6 rounded-lg shadow-sm"
          style={{
            backgroundColor: 'white',
            borderBottom: '2px solid #EA580C' // Slightly darker orange border
          }}
        >
          <h1 className="text-2xl font-bold" style={{ color: '#111827' }}>
            Admin Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
            Manage your ClothStore operations
          </p>
        </div>

        <div 
          className="bg-white rounded-lg shadow-sm p-6"
          style={{
            minHeight: 'calc(100vh - 200px)'
          }}
        >
          <Outlet />
        </div>

        <div className="mt-6 text-center text-sm" style={{ color: '#F3F4F6' }}>
          ClothStore Admin Panel © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
