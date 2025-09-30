import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const Sidebar = () => {
  const { logout } = useAuth();  

  return (
    <div className="w-64 h-screen sticky top-0 p-6 shadow-lg" 
         style={{ backgroundColor: '#F97316' }}> {/* Orange background */}
      
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
        <p className="text-sm mt-1 text-white/90">ClothStore Management</p>
      </div>

      <nav className="flex flex-col space-y-3">
        <Link
          to="/"
          className="px-4 py-2 rounded-md transition-colors duration-200 hover:bg-[#EA580C]" /* Darker orange on hover */
          style={{ color: 'white' }}
        >Back to Home</Link>

        <Link 
          to="/admin" 
          className="px-4 py-2 rounded-md transition-colors duration-200 hover:bg-[#EA580C]"
          style={{ color: 'white' }}
        >
          Dashboard Home
        </Link>

        <Link 
          to="/admin/orders" 
          className="px-4 py-2 rounded-md transition-colors duration-200 hover:bg-[#EA580C]"
          style={{ color: 'white' }}
        >
          Manage Orders
        </Link>

        <Link 
          to="/admin/products" 
          className="px-4 py-2 rounded-md transition-colors duration-200 hover:bg-[#EA580C]"
          style={{ color: 'white' }}
        >
          Product Catalog
        </Link>

        <Link 
          to="/admin/customers" 
          className="px-4 py-2 rounded-md transition-colors duration-200 hover:bg-[#EA580C]"
          style={{ color: 'white' }}
        >
          Customer Management
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
