import React from 'react';
import Branding from '../components/auth/Branding';

const AuthLayout = ({ children }) => (
  <div className="flex min-h-screen flex-col lg:flex-row">
    <Branding />
    <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-900 py-12 px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
      {children}
    </div>
  </div>
);

export default AuthLayout;