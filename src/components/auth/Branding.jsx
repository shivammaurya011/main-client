import React from 'react';

const Branding = () => (
  <div className="hidden lg:flex w-1/2 flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-800 text-white px-8 py-12 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)] opacity-50" />
    <div className="relative z-10 text-center space-y-8">
      <h1 className="text-5xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          PremacAI
        </span>
      </h1>
      <p className="text-xl text-gray-200 max-w-md leading-relaxed font-light">
        Empowering talent acquisition and development with cutting-edge AI solutions.
      </p>
      <div className="flex justify-center gap-4">
        {['Career', 'Campus', 'Hire'].map((item, idx) => (
          <span
            key={idx}
            className={`px-4 py-1.5 rounded-lg border text-sm font-normal ${
              idx === 0
                ? 'border-orange-500/20 text-orange-300'
                : idx === 1
                ? 'border-emerald-500/20 text-emerald-300'
                : 'border-blue-500/20 text-blue-300'
            } ${
              idx === 0
                ? 'bg-emerald-500/5'
                : idx === 1
                ? 'bg-blue-500/5'
                : 'bg-orange-500/5'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default Branding;