import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Check,
  TrendingUp, 
  BarChart2
} from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ 
      email: email || 'admin@demo.com', 
      role: (email || '').toLowerCase().includes('admin') ? 'Administrator' : 'Client' 
    });
  };

  const fillCredentials = (userEmail, userPass) => {
    setEmail(userEmail);
    setPassword(userPass);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#ffffff] text-[#334155] font-sans">
      
      {/* ======================================================== */}
      {/* LEFT SECTION: Vuexy Visual Showcase (Character & Cards)  */}
      {/* ======================================================== */}
      <div className="hidden lg:flex lg:w-3/5 bg-[#F8F7FA] relative items-center justify-center p-8 overflow-hidden border-r border-[#E6E6EC]">
        
        {/* Brand Logo & Name (Top-Left) */}
        <div className="absolute top-8 left-10 flex items-center gap-3 z-30">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7367F0] to-[#9E95F5] flex items-center justify-center text-white shadow-lg shadow-[#7367f040]">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M4.5 4.5 L9.5 19.5 L14.5 4.5 L19.5 19.5" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-2xl font-extrabold text-[#2F2B3D] tracking-tight font-heading">
            Vuexy
          </span>
        </div>

        {/* Ambient Halo Circular Rings */}
        <div className="absolute w-[500px] h-[500px] rounded-full border border-[#7367F015] bg-gradient-to-tr from-[#7367F008] to-[#9E95F510] flex items-center justify-center pointer-events-none">
          <div className="w-[360px] h-[360px] rounded-full border border-[#7367F020] bg-white/40 shadow-inner"></div>
        </div>

        {/* Floating Card 1: Profit (Top-Left) */}
        <div className="absolute top-20 left-14 z-20 bg-white p-4 rounded-2xl shadow-xl border border-[#EBE9F1] w-48 transition-all hover:scale-105 duration-300">
          <p className="text-sm font-bold text-[#2F2B3D]">Profit</p>
          <p className="text-xs text-[#A5A3AE] mb-2">Last Month</p>
          
          {/* Cyan Glowing Sparkline */}
          <div className="h-10 my-1 relative">
            <svg viewBox="0 0 100 32" className="w-full h-full overflow-visible">
              <path
                d="M 5 26 L 22 14 L 42 22 L 62 8 L 80 18 L 96 4"
                fill="none"
                stroke="#00CFE8"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="96" cy="4" r="4" fill="#00CFE8" stroke="#ffffff" strokeWidth="2.5" />
            </svg>
          </div>

          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#F1F0F2]">
            <span className="text-lg font-black text-[#2F2B3D] tracking-tight">624k</span>
            <span className="text-[11px] text-[#28C76F] font-bold bg-[#28C76F18] px-2 py-0.5 rounded-md">
              +8.24%
            </span>
          </div>
        </div>

        {/* Center 3D Character Illustration */}
        <div className="relative z-10 flex flex-col items-center justify-center max-w-sm">
          <img 
            src="/assets/vuexy-character.jpg" 
            alt="Vuexy 3D Character" 
            className="w-80 h-auto object-contain drop-shadow-2xl rounded-2xl transition-transform duration-500 hover:scale-102"
          />
        </div>

        {/* Floating Card 2: Order (Bottom-Right) */}
        <div className="absolute bottom-20 right-14 z-20 bg-white p-4 rounded-2xl shadow-xl border border-[#EBE9F1] w-48 transition-all hover:scale-105 duration-300">
          <p className="text-sm font-bold text-[#2F2B3D]">Order</p>
          <p className="text-xs text-[#A5A3AE] mb-2">Last week</p>
          
          {/* Modern Bar Graph */}
          <div className="h-10 flex items-end justify-between gap-1.5 px-1 my-1">
            <div className="w-2.5 h-8 bg-[#7367F0] rounded-t-sm"></div>
            <div className="w-2.5 h-4 bg-[#7367F040] rounded-t-sm"></div>
            <div className="w-2.5 h-9 bg-[#7367F0] rounded-t-sm"></div>
            <div className="w-2.5 h-3 bg-[#7367F030] rounded-t-sm"></div>
            <div className="w-2.5 h-8 bg-[#7367F0] rounded-t-sm"></div>
            <div className="w-2.5 h-5 bg-[#7367F060] rounded-t-sm"></div>
            <div className="w-2.5 h-10 bg-[#7367F0] rounded-t-sm"></div>
          </div>

          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#F1F0F2]">
            <span className="text-lg font-black text-[#2F2B3D] tracking-tight">124k</span>
            <span className="text-[11px] text-[#28C76F] font-bold bg-[#28C76F18] px-2 py-0.5 rounded-md">
              +12.6%
            </span>
          </div>
        </div>

        {/* Subtle Wave Backdrop */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none opacity-40">
          <svg viewBox="0 0 1440 320" className="w-full h-full preserve-3d" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,229.3C1120,235,1280,213,1360,202.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>

      </div>

      {/* ======================================================== */}
      {/* RIGHT SECTION: Professional Authentication Form         */}
      {/* ======================================================== */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-12 xl:px-20 py-10 relative bg-white">
        
        {/* Mobile Brand Header */}
        <div className="lg:hidden flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-[#7367F0] flex items-center justify-center text-white shadow-md shadow-[#7367f030]">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M4.5 4.5 L9.5 19.5 L14.5 4.5 L19.5 19.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-xl font-bold text-[#2F2B3D]">Vuexy</span>
        </div>

        <div className="max-w-md w-full mx-auto space-y-6">
          
          {/* Welcome Header */}
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2F2B3D] tracking-tight flex items-center gap-2">
              Welcome to Vuexy! <span className="inline-block text-2xl animate-pulse">👋</span>
            </h2>
            <p className="text-sm text-[#82868B] leading-relaxed">
              Please sign-in to your account and start the adventure
            </p>
          </div>

          {/* Quick Demo Credentials Box */}
          <div className="p-4 rounded-xl bg-[#F4F3FF] border border-[#E8E6FB] space-y-2.5">
            <div 
              onClick={() => fillCredentials('admin@demo.com', 'admin')}
              className="flex items-center justify-between cursor-pointer hover:bg-white/80 p-1.5 rounded-lg transition-all text-xs font-medium text-[#5E5873]"
              title="Click to Autofill Admin credentials"
            >
              <div>
                <span className="text-[#7367F0] font-semibold">Admin Email:</span> admin@demo.com <span className="text-[#A5A3AE]">/</span> <span className="text-[#7367F0] font-semibold">Pass:</span> admin
              </div>
              <span className="text-[10px] bg-[#7367F0] text-white px-2 py-0.5 rounded font-bold shadow-xs">
                Autofill
              </span>
            </div>
            
            <div 
              onClick={() => fillCredentials('client@demo.com', 'client')}
              className="flex items-center justify-between cursor-pointer hover:bg-white/80 p-1.5 rounded-lg transition-all text-xs font-medium text-[#5E5873]"
              title="Click to Autofill Client credentials"
            >
              <div>
                <span className="text-[#7367F0] font-semibold">Client Email:</span> client@demo.com <span className="text-[#A5A3AE]">/</span> <span className="text-[#7367F0] font-semibold">Pass:</span> client
              </div>
              <span className="text-[10px] bg-[#7367F0] text-white px-2 py-0.5 rounded font-bold shadow-xs">
                Autofill
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#5D596C] uppercase tracking-wider">
                Email or Username
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@demo.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DBDADE] bg-white text-sm text-[#2F2B3D] focus:border-[#7367F0] focus:ring-3 focus:ring-[#7367f020] transition-all outline-none"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#5D596C] uppercase tracking-wider">
                  Password
                </label>
                <a 
                  href="#forgot" 
                  onClick={(e) => { e.preventDefault(); fillCredentials('admin@demo.com', 'admin'); }} 
                  className="text-xs font-semibold text-[#7367F0] hover:text-[#5e50ee] transition-colors"
                >
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
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-[#DBDADE] bg-white text-sm text-[#2F2B3D] focus:border-[#7367F0] focus:ring-3 focus:ring-[#7367f020] transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#A5A3AE] hover:text-[#5D596C] p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#5D596C]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#7367F0] focus:ring-0 accent-[#7367F0] cursor-pointer"
                />
                <span>Remember Me</span>
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-[#7367F0] hover:bg-[#685dd8] active:bg-[#5e50ee] text-white text-sm font-bold tracking-wide transition-all shadow-md shadow-[#7367f040] hover:shadow-lg hover:shadow-[#7367f050] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign in</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Create Account Link */}
          <p className="text-center text-xs text-[#82868B]">
            New on our platform?{' '}
            <a
              href="#signup"
              onClick={(e) => {
                e.preventDefault();
                onLogin({ email: 'newuser@demo.com', role: 'User' });
              }}
              className="text-[#7367F0] font-bold hover:underline"
            >
              Create an account
            </a>
          </p>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#DBDADE] w-full"></div>
            <span className="bg-white px-3 text-[11px] font-semibold text-[#A5A3AE] uppercase absolute">
              or
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => onLogin({ email: 'facebook@demo.com', role: 'Social User' })}
              className="w-9 h-9 rounded-lg bg-[#F4F3FF] text-[#3B5998] hover:bg-[#3B5998] hover:text-white flex items-center justify-center transition-all font-black text-sm"
              title="Sign in with Facebook"
            >
              f
            </button>
            <button
              type="button"
              onClick={() => onLogin({ email: 'twitter@demo.com', role: 'Social User' })}
              className="w-9 h-9 rounded-lg bg-[#F4F3FF] text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-all"
              title="Sign in with Twitter"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onLogin({ email: 'github@demo.com', role: 'Developer' })}
              className="w-9 h-9 rounded-lg bg-[#F4F3FF] text-[#24292E] hover:bg-[#24292E] hover:text-white flex items-center justify-center transition-all"
              title="Sign in with GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onLogin({ email: 'google@demo.com', role: 'Google User' })}
              className="w-9 h-9 rounded-lg bg-[#F4F3FF] text-[#EA4335] hover:bg-[#EA4335] hover:text-white flex items-center justify-center transition-all font-black text-sm"
              title="Sign in with Google"
            >
              G
            </button>
          </div>

        </div>

        {/* Floating 'Buy Now' badge in bottom right (matching screenshot 1:1) */}
        <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
          <button 
            onClick={() => onLogin({ email: 'admin@demo.com', role: 'Administrator' })}
            className="px-5 py-2.5 rounded-lg text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #e91e63 0%, #7367f0 100%)',
              boxShadow: '0 8px 25px -3px rgba(233, 30, 99, 0.5)'
            }}
          >
            Buy Now
          </button>
        </div>

      </div>

    </div>
  );
}
