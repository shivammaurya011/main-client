import React, { useState } from 'react';
import { useSendOTPEmailMutation, useRegisterMutation, useGoogleLoginMutation } from '../../api/apiSlice';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { auth, googleProvider, signInWithPopup } from '../../config/firebase';
import AuthLayout from '../../layout/AuthLayout';

const ROLES = {
  CAREER: 'career',
  CAMPUS: 'campus',
  HIRE: 'hire',
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '',
    phone: '',
    password: '',
    role: ROLES.CAREER,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [sendOTPEmail] = useSendOTPEmailMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleRoleChange = (role) => setFormData((prev) => ({ ...prev, role }));

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{6,14}$/;
    const countryCodeRegex = /^\+\d{1,3}$/;

    if (!formData.name.trim()) newErrors.name = `${getNameLabel()} is required`;
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.countryCode) newErrors.countryCode = 'Country code is required';
    else if (!countryCodeRegex.test(formData.countryCode)) newErrors.countryCode = 'Invalid code (e.g., +91)';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Enter 6-14 digits';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const fullPhone = `${formData.countryCode}${formData.phone}`;
      const response = await register({ ...formData, phone: fullPhone }).unwrap();
      await sendOTPEmail({ email: formData.email }).unwrap();
      toast.success('OTP sent to your email');
      navigate('/verify-otp', { state: { email: formData.email, phone: fullPhone } });
    } catch (error) {
      toast.error(error?.data?.message || 'Registration failed');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const response = await googleLogin({ idToken }).unwrap();
      toast.success(response.message || 'Registered successfully');
      navigate('/', { replace: true });
    } catch (error) {
      toast.error(error?.data?.message || 'Google registration failed');
    }
  };

  const getNameLabel = () => {
    return formData.role === ROLES.HIRE
      ? 'Organization Name'
      : formData.role === ROLES.CAMPUS
      ? 'Institute Name'
      : 'Full Name';
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-6 p-6 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">
            Join <span className="text-emerald-400">PremacAI</span>
          </h2>
          <p className="mt-1 text-gray-400">Create your account</p>
        </div>

        <div className="flex gap-2">
          {Object.values(ROLES).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => handleRoleChange(role)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                formData.role === role
                  ? role === 'career' ? 'bg-orange-500/20 text-orange-300' : role === 'hire' ? 'bg-blue-500/20 text-blue-300' : 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600'
              }`}
            >
              {role === ROLES.CAREER ? 'Student' : role === ROLES.CAMPUS ? 'Institute' : 'Hire'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Input
            label={getNameLabel()}
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={
              formData.role === ROLES.HIRE
                ? 'TechCorp'
                : formData.role === ROLES.CAMPUS
                ? 'XYZ University'
                : 'John Doe'
            }
            required
            error={errors.name}
          />
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
          <div className="flex gap-3">
            <Input
              label="Code"
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              placeholder="+91"
              required
              error={errors.countryCode}
              className="w-1/5"
            />
            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="1234567890"
              required
              error={errors.phone}
              className="w-4/5"
            />
          </div>
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

          <Button
            type="submit"
            disabled={isRegistering}
            className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
          >
            {isRegistering ? 'Registering...' : 'Register'}
          </Button>
        </form>

        <Button
          onClick={handleGoogleLogin}
          disabled={isRegistering}
          className="w-full bg-orange-500 text-white hover:bg-orange-600 flex items-center justify-center gap-2"
        >
          <FaGoogle /> Sign up with Google
        </Button>

        <p className="text-center text-sm text-gray-400">
          Have an account?{' '}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;