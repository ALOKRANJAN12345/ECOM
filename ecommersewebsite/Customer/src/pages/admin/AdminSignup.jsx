import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaLock, FaEnvelope, FaSignature } from "react-icons/fa";
import axios from "axios";
  
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000"; // ✅ use env for deploy/local

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // ✅ Register admin
      await axios.post(
        `${BASE_URL}/api/auth/register`,
        { name, email, password, role: "admin" },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      // ✅ Login admin immediately
      const res = await axios.post(
        `${BASE_URL}/api/auth/login`,
        { email, password, role: "admin" },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      const { user, token } = res.data;

      if (user.role !== "admin") {
        setError("Unauthorized. Not an admin.");
        return;
      }

      login({ ...user, token });
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("❌ Admin Signup Error:", err);
      setError(err.response?.data?.error || "Admin registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#F97316" }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-orange-600 flex items-center justify-center">
            <FaUserShield className="text-white text-2xl" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Admin Registration
        </h2>
        <p className="mt-2 text-center text-sm text-gray-100">
          Create your admin account to access the dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              id="name"
              icon={<FaSignature />}
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              label="Email address"
              id="email"
              type="email"
              icon={<FaEnvelope />}
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              id="password"
              type="password"
              icon={<FaLock />}
              value={formData.password}
              onChange={handleChange}
            />
            <InputField
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              icon={<FaLock />}
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent 
                  rounded-md shadow-sm text-sm font-medium text-white 
                  ${loading ? "bg-orange-400" : "bg-orange-600 hover:bg-orange-700"} 
                  focus:outline-none`}
              >
                {loading ? "Registering..." : "Register Admin Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Reusable InputField Component
const InputField = ({ label, id, icon, value, onChange, type = "text" }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        id={id}
        name={id}
        type={type}
        required
        value={value}
        onChange={onChange}
        className="py-3 pl-10 block w-full border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
      />
    </div>
  </div>
);

export default AdminSignup;
