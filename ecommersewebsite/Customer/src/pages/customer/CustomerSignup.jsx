import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaSignature } from 'react-icons/fa';
import axios from 'axios';

const CustomerSignup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // ✅ Register with role: customer
      await axios.post("https://ecom-6ipr.vercel.app//api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: 'customer'
      });

      // ✅ Auto login after signup
      const res = await axios.post("https://ecom-6ipr.vercel.app/api/auth/login", {
        email: form.email,
        password: form.password,
        role: 'customer'
      });

      login({ ...res.data.user, token: res.data.token });
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err?.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
            <FaUser className="text-white text-2xl" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Your Account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Join us to start shopping today</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField label="Full Name" name="name" icon={<FaSignature />} value={form.name} onChange={handleChange} />
            <InputField label="Email address" name="email" type="email" icon={<FaEnvelope />} value={form.email} onChange={handleChange} />
            <InputField label="Password" name="password" type="password" icon={<FaLock />} value={form.password} onChange={handleChange} />
            <InputField label="Confirm Password" name="confirmPassword" type="password" icon={<FaLock />} value={form.confirmPassword} onChange={handleChange} />

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                } transition`}
              >
                {loading ? 'Creating...' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            Already have an account?{' '}
            <a href="/customer/login" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// 🔄 Reusable input field
const InputField = ({ label, name, icon, value, onChange, type = "text" }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="py-3 pl-10 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

export default CustomerSignup;
