import React, { useState } from 'react';
import { useLoginMutation, useGoogleLoginMutation } from '../../api/apiSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { auth, googleProvider, signInWithPopup } from '../../config/firebase';
import AuthLayout from '../../layout/AuthLayout';
import config from '../../config/env';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [googleLogin, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  // Parse and validate redirect URL
  const query = new URLSearchParams(location.search);
  const redirectUrl = query.get('redirect') || `${config.platforms.mainUrl}/`;
  const isValidRedirect = (url) => {
    try {
      const parsedUrl = new URL(url);
      const allowedOrigins = [
        config.platforms.mainUrl,
        config.platforms.hireUrl,
        config.platforms.campusUrl,
        config.platforms.careerUrl,
      ];
      return allowedOrigins.includes(parsedUrl.origin);
    } catch {
      return false;
    }
  };
  const safeRedirectUrl = isValidRedirect(redirectUrl) ? redirectUrl : `${config.platforms.mainUrl}/`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const response = await googleLogin({ idToken }).unwrap();
      toast.success(response.message || 'Logged in successfully', { toastId: 'google-login-success' });
      window.location.href = safeRedirectUrl;
    } catch (error) {
      toast.error(error?.data?.message || 'Google login failed', { toastId: 'google-login-error' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await login(formData).unwrap();
      toast.success(response.message || 'Logged in successfully', { toastId: 'login-success' });
      window.location.href = safeRedirectUrl;
    } catch (error) {
      const message = error?.data?.message || 'Login failed';
      toast.error(message, { toastId: 'login-error' });
      if (message.toLowerCase().includes('verify')) {
        navigate('/verify-otp', { state: { email: formData.email } });
      }
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-6 p-6 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">
            Welcome to <span className="text-emerald-400">{config.appName}</span>
          </h2>
          <p className="mt-1 text-gray-400">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            required
            error={errors.email}
          />
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              error={errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-emerald-400"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-400">
              <input
                type="checkbox"
                className="mr-2 rounded border-gray-600 text-emerald-500 focus:ring-emerald-500"
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-emerald-400 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoginLoading || isGoogleLoading}
            className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
          >
            {isLoginLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <Button
          onClick={handleGoogleLogin}
          disabled={isLoginLoading || isGoogleLoading}
          className="w-full bg-orange-500 text-white hover:bg-orange-600 flex items-center justify-center gap-2"
        >
          <FaGoogle /> {isGoogleLoading ? 'Processing...' : 'Sign in with Google'}
        </Button>

        <p className="text-center text-sm text-gray-400">
          No account?{' '}
          <Link to="/register" className="text-emerald-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;