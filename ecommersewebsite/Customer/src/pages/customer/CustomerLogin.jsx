import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('https://project-hefx.vercel.app/api/auth/login', {
        email,
        password,
        role: 'customer'
      });

      // Optional: Ensure role from backend
      if (res.data.user.role !== 'customer') {
        setError('You are not authorized as a customer');
        return;
      }

      login({ ...res.data.user, token: res.data.token });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
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
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Customer Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField
              id="email"
              label="Email address"
              icon={<FaEnvelope />}
              type="email"
              value={email}
              onChange={setEmail}
            />
            <InputField
              id="password"
              label="Password"
              icon={<FaLock />}
              type="password"
              value={password}
              onChange={setPassword}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-900">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2" />
                Remember me
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium shadow transition"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            New here?{' '}
            <a href="/customer/signup" className="text-blue-600 hover:underline">
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// 🔄 Reusable Input Field
const InputField = ({ id, label, icon, type = 'text', value, onChange }) => (
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
        className="py-3 pl-10 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);

export default CustomerLogin;
