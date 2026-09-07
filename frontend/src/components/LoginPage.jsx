import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  TrendingUp, 
  BarChart2, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, role: email.includes('admin') ? 'Administrator' : 'Client' });
  };

  const fillCredentials = (userEmail, userPass) => {
    setEmail(userEmail);
    setPassword(userPass);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#ffffff] text-[#334155] select-none">
      
      {/* LEFT SIDE: Visual Showcase (Matching Vuexy Illustration & Floating Cards) */}
      <div className="hidden lg:flex lg:w-3/5 bg-[#f8f7fa] relative items-center justify-center p-8 overflow-hidden border-r border-[#e6e6ec]">
        
        {/* Top-Left Brand */}
        <div className="absolute top-8 left-10 flex items-center gap-2.5 z-20">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7367F0] to-[#9E95F5] flex items-center justify-center text-white shadow-md shadow-[#7367f035]">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M4.5 4.5 L9.5 19.5 L14.5 4.5 L19.5 19.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-xl font-extrabold text-[#2f2b3d] tracking-tight font-heading">
            Vuexy
          </span>
        </div>

        {/* Circular Ambient Halo */}
        <div className="w-[450px] h-[450px] rounded-full border border-[#7367f020] bg-gradient-to-tr from-[#7367F008] to-[#ce9ffc15] absolute flex items-center justify-center pointer-events-none">
          <div className="w-[320px] h-[320px] rounded-full border border-[#7367f030] bg-[#ffffff40]"></div>
        </div>

        {/* 3D Modern Character Vector Graphic */}
        <div className="relative z-10 flex flex-col items-center">
          <svg viewBox="0 0 240 380" className="w-64 h-auto drop-shadow-xl">
            {/* Hair */}
            <path d="M 85 85 Q 120 40 155 85 Q 160 105 145 105 Q 120 95 95 105 Z" fill="#2c2836" />
            {/* Head */}
            <ellipse cx="120" cy="100" rx="28" ry="32" fill="#ffdbb4" />
            {/* Smile & Eyes */}
            <circle cx="110" cy="95" r="3" fill="#2c2836" />
            <circle cx="130" cy="95" r="3" fill="#2c2836" />
            <path d="M 112 112 Q 120 120 128 112" fill="none" stroke="#2c2836" strokeWidth="2" strokeLinecap="round" />
            
            {/* Body / Purple T-Shirt */}
            <path d="M 90 132 Q 120 136 150 132 L 158 215 L 82 215 Z" fill="#7367F0" />
            {/* Neck */}
            <rect x="112" y="125" width="16" height="12" fill="#ffdbb4" rx="3" />

            {/* Left Arm / Hand thumbs up */}
            <path d="M 90 140 Q 65 170 85 195 Q 105 200 115 180" fill="none" stroke="#ffdbb4" strokeWidth="12" strokeLinecap="round" />
            <circle cx="118" cy="178" r="7" fill="#ffdbb4" />
            {/* Thumb */}
            <path d="M 116 172 L 116 164" stroke="#ffdbb4" strokeWidth="5" strokeLinecap="round" />
            {/* Watch */}
            <rect x="100" y="185" width="8" height="8" fill="#2c2836" rx="2" />

            {/* Right Arm */}
            <path d="M 150 140 Q 170 180 155 220" fill="none" stroke="#ffdbb4" strokeWidth="12" strokeLinecap="round" />
            <circle cx="155" cy="225" r="7" fill="#ffdbb4" />

            {/* Pants (Slate Dark) */}
            <path d="M 85 215 L 155 215 L 148 340 L 125 340 L 120 250 L 115 340 L 92 340 Z" fill="#3b4256" />

            {/* Shoes */}
            <ellipse cx="103" cy="350" rx="14" ry="7" fill="#795548" />
            <ellipse cx="137" cy="350" rx="14" ry="7" fill="#795548" />
          </svg>
        </div>

        {/* Floating Card 1: Profit (Top-Left) */}
        <div className="absolute top-24 left-16 z-20 bg-[#ffffff] p-4 rounded-2xl shadow-xl border border-[#ebe9f1] w-44 animate-float">
          <p className="text-xs font-bold text-[#2f2b3d]">Profit</p>
          <p className="text-[11px] text-[#a5a3ae] mb-2">Last Month</p>
          
          {/* Sparkline */}
          <div className="h-10 my-1">
            <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
              <path
                d="M 5 24 L 20 12 L 40 22 L 60 8 L 80 18 L 95 4"
                fill="none"
                stroke="#00CFE8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="95" cy="4" r="3.5" fill="#00CFE8" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#f1f0f2]">
            <span className="text-base font-extrabold text-[#2f2b3d]">624k</span>
            <span className="text-[10px] text-[#28C76F] font-bold bg-[#28c76f15] px-1.5 py-0.5 rounded-md">
              +8.24%
            </span>
          </div>
        </div>

        {/* Floating Card 2: Order (Bottom-Right) */}
        <div className="absolute bottom-24 right-16 z-20 bg-[#ffffff] p-4 rounded-2xl shadow-xl border border-[#ebe9f1] w-44" style={{ animation: 'floatSoft 4.5s ease-in-out infinite 0.6s' }}>
          <p className="text-xs font-bold text-[#2f2b3d]">Order</p>
          <p className="text-[11px] text-[#a5a3ae] mb-2">Last week</p>
          
          {/* Mini Bar Graph */}
          <div className="h-10 flex items-end justify-between gap-1 px-1 my-1">
            <div className="w-2 h-7 bg-[#7367F0] rounded-t-xs"></div>
            <div className="w-2 h-4 bg-[#7367F050] rounded-t-xs"></div>
            <div className="w-2 h-9 bg-[#7367F0] rounded-t-xs"></div>
            <div className="w-2 h-3 bg-[#7367F040] rounded-t-xs"></div>
            <div className="w-2 h-8 bg-[#7367F0] rounded-t-xs"></div>
            <div className="w-2 h-6 bg-[#7367F070] rounded-t-xs"></div>
            <div className="w-2 h-10 bg-[#7367F0] rounded-t-xs"></div>
          </div>

          <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#f1f0f2]">
            <span className="text-base font-extrabold text-[#2f2b3d]">124k</span>
            <span className="text-[10px] text-[#28C76F] font-bold bg-[#28c76f15] px-1.5 py-0.5 rounded-md">
              +12.6%
            </span>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE: Authentication Form */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-14 xl:px-20 py-12 relative">
        
        {/* Mobile Brand */}
        <div className="lg:hidden flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#7367F0] flex items-center justify-center text-white">
            <BarChart2 className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold text-[#2f2b3d]">Vuexy Analytics</span>
        </div>

        <div className="max-w-md w-full mx-auto space-y-5">
          
          {/* Form Header */}
          <div>
            <h2 className="text-2xl font-bold text-[#2f2b3d] tracking-tight flex items-center gap-2">
              Welcome to Vuexy! <span className="inline-block animate-bounce text-xl">👋</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#82868b] mt-1">
              Please sign-in to your account and start the adventure
            </p>
          </div>

          {/* Quick Demo Credentials Box (Matching the screenshot) */}
          <div className="p-3.5 rounded-xl bg-[#f4f3ff] border border-[#e8e6fb] text-xs space-y-1.5">
            <div 
              onClick={() => fillCredentials('admin@demo.com', 'admin')}
              className="flex items-center justify-between cursor-pointer hover:text-[#7367F0] transition-colors font-medium text-[#5e5873]"
            >
              <span>Admin Email: <strong className="text-[#7367F0]">admin@demo.com</strong> / Pass: <strong>admin</strong></span>
              <span className="text-[10px] bg-[#7367F018] text-[#7367F0] px-1.5 py-0.5 rounded font-bold">Autofill</span>
            </div>
            <div 
              onClick={() => fillCredentials('client@demo.com', 'client')}
              className="flex items-center justify-between cursor-pointer hover:text-[#7367F0] transition-colors font-medium text-[#5e5873]"
            >
              <span>Client Email: <strong className="text-[#7367F0]">client@demo.com</strong> / Pass: <strong>client</strong></span>
              <span className="text-[10px] bg-[#7367F018] text-[#7367F0] px-1.5 py-0.5 rounded font-bold">Autofill</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-[#5d596c] mb-1.5">
                Email or Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@demo.com"
                  className="form-input text-xs sm:text-sm py-2 px-3 rounded-lg border-[#dbdade] focus:border-[#7367F0]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#5d596c]">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs text-[#7367F0] hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="············"
                  className="form-input text-xs sm:text-sm py-2 pl-3 pr-10 rounded-lg border-[#dbdade] focus:border-[#7367F0]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#a5a3ae] hover:text-[#5d596c]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#5d596c]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#7367F0] focus:ring-0 w-4 h-4 accent-[#7367F0] cursor-pointer"
                />
                <span>Remember Me</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn btn-primary py-2.5 rounded-lg text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <span>Sign in</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Registration Link */}
          <p className="text-center text-xs text-[#82868b] pt-1">
            New on our platform?{' '}
            <a
              href="#signup"
              onClick={(e) => {
                e.preventDefault();
                onLogin({ email: 'newuser@demo.com', role: 'User' });
              }}
              className="text-[#7367F0] font-semibold hover:underline"
            >
              Create an account
            </a>
          </p>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="border-t border-[#dbdade] w-full"></div>
            <span className="bg-[#ffffff] px-3 text-[11px] text-[#a5a3ae] uppercase absolute">
              or
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onLogin({ email: 'facebook@demo.com', role: 'Social User' })}
              className="w-9 h-9 rounded-lg bg-[#f4f3ff] text-[#7367F0] flex items-center justify-center hover:bg-[#7367F0] hover:text-white transition-colors"
              title="Sign in with Facebook"
            >
              f
            </button>
            <button
              type="button"
              onClick={() => onLogin({ email: 'twitter@demo.com', role: 'Social User' })}
              className="w-9 h-9 rounded-lg bg-[#f4f3ff] text-[#00CFE8] flex items-center justify-center hover:bg-[#00CFE8] hover:text-white transition-colors"
              title="Sign in with Twitter"
            >
              🐦
            </button>
            <button
              type="button"
              onClick={() => onLogin({ email: 'github@demo.com', role: 'Developer' })}
              className="w-9 h-9 rounded-lg bg-[#f4f3ff] text-[#2f2b3d] flex items-center justify-center hover:bg-[#2f2b3d] hover:text-white transition-colors"
              title="Sign in with GitHub"
            >
              🐱
            </button>
            <button
              type="button"
              onClick={() => onLogin({ email: 'google@demo.com', role: 'Google User' })}
              className="w-9 h-9 rounded-lg bg-[#f4f3ff] text-[#EA5455] flex items-center justify-center hover:bg-[#EA5455] hover:text-white transition-colors font-bold"
              title="Sign in with Google"
            >
              G
            </button>
          </div>

        </div>

        {/* Floating 'Buy Now' badge in bottom right (matching screenshot) */}
        <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
          <button 
            onClick={() => onLogin({ email: 'admin@demo.com', role: 'Administrator' })}
            className="px-5 py-2.5 rounded-lg text-white font-semibold text-sm shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #e91e63 0%, #7367f0 100%)',
              boxShadow: '0 8px 20px -4px rgba(233, 30, 99, 0.5)'
            }}
          >
            Buy Now
          </button>
        </div>

      </div>

    </div>
  );
}
