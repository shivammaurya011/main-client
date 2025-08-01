import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../../api/apiSlice';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AuthLayout from '../../layout/AuthLayout';

const ResetPassword = () => {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (!token) navigate('/forgot-password', { replace: true });
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Must contain at least 6 chars, 1 letter & 1 number';
    }
  
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await resetPassword({ token, password: formData.password }).unwrap();
      toast.success('Password reset successfully');
      navigate('/login', { replace: true });
    } catch (error) {
      const message = error?.data?.message || 'Failed to reset password';
      toast.error(message);
      if (message.includes('expired')) navigate('/forgot-password', { replace: true });
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-6 p-6 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">
            Reset Password <span className="text-emerald-400">PremacAI</span>
          </h2>
          <p className="mt-1 text-gray-400">Set your new password</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="relative">
            <Input
              label="New Password"
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
          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              error={errors.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-emerald-400"
            >
              {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>

        </form>

        <p className="text-center text-sm text-gray-400">
          Back to{' '}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;