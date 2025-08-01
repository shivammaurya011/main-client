import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useVerifyOTPEmailMutation, useSendOTPEmailMutation } from '../../api/apiSlice';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { toast } from 'react-toastify';
import AuthLayout from '../../layout/AuthLayout';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [verifyOTPEmail, { isLoading: isVerifying }] = useVerifyOTPEmailMutation();
  const [sendOTPEmail, { isLoading: isSending }] = useSendOTPEmailMutation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email } = state || {};

  // Redirect if no email is provided
  useEffect(() => {
    if (!email) {
      toast.error('Invalid verification state. Please register again.');
      navigate('/register', { replace: true });
    }
  }, [email, navigate]);

  // Handle resend cooldown timer
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleChange = (e) => {
    setOtp(e.target.value);
    setError('');
  };

  const validateOTP = () => {
    if (!otp.trim()) return 'OTP is required';
    if (otp.length < 4) return 'OTP must be at least 4 digits';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateOTP();
    setError(validationError);
    if (validationError) return;

    try {
      await verifyOTPEmail({ email, otp }).unwrap();
      toast.success('Email verified successfully!');
      navigate('/', { replace: true });
    } catch (error) {
      const message = error?.data?.message || 'Invalid OTP';
      setError(message);
      toast.error(message);
    }
  };

  const handleResendOTPEmail = async () => {
    if (resendCooldown > 0 || isSending) return;

    try {
      await sendOTPEmail({ email }).unwrap();
      toast.success('OTP resent to your email');
      setResendCooldown(60);
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to resend OTP');
    }
  };

  if (!email) return null;

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-6 p-6 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">
            Verify OTP <span className="text-emerald-400">PremacAI</span>
          </h2>
          <p className="mt-1 text-gray-400">
            Enter OTP sent to <span className="text-emerald-400">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="OTP"
            name="otp"
            value={otp}
            onChange={handleChange}
            placeholder="123456"
            required
            error={error}
            type="text"
            className="text-center tracking-widest"
          />

          <Button
            type="submit"
            disabled={isVerifying || isSending}
            className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
          >
            {isVerifying ? 'Verifying...' : 'Verify OTP'}
          </Button>

          <Button
            type="button"
            onClick={handleResendOTPEmail}
            disabled={resendCooldown > 0 || isSending || isVerifying}
            className="w-full bg-gray-600 text-white hover:bg-gray-700 disabled:bg-gray-600/50"
          >
            {isSending
              ? 'Sending...'
              : resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : 'Resend OTP'}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default VerifyOTP;