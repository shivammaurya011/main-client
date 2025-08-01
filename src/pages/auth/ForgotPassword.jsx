import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForgotPasswordMutation } from '../../api/apiSlice';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { toast } from 'react-toastify';
import AuthLayout from '../../layout/AuthLayout';
import { FaCheckCircle } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };
  
  const validateEmail = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Invalid email format';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateEmail();
    setError(validationError);
    if (validationError) return;
  
    try {
      const response = await forgotPassword({ email }).unwrap();
      if (response?.success) {
        setShowSuccess(true);
      } else {
        toast.error(response?.message || 'Something went wrong');
      }
    } catch (error) {
      setError(error?.data?.message || 'Failed to send reset link');
    }
  };
  

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-6 p-6 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">
            Forgot Password <span className="text-emerald-400">PremacAI</span>
          </h2>
          {!showSuccess && <p className="mt-1 text-gray-400">Reset your password</p>}
        </div>

        {!showSuccess ? (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              required
              error={error}
            />
            <Button
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
              className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <FaCheckCircle className="mx-auto h-12 w-12 text-emerald-400" />
            <h3 className="text-xl font-semibold text-white">Reset Link Sent!</h3>
            <p className="text-gray-400">
              Check your email: <span className="text-emerald-400">{email}</span>
            </p>
            <Link to="/login" className="text-emerald-400 hover:underline">
              ← Back to Sign In
            </Link>
          </div>
        )}

        {!showSuccess && (
          <p className="text-center text-sm text-gray-400">
            Remember your password?{' '}
            <Link to="/login" className="text-emerald-400 hover:underline">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;