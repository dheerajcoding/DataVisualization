import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff
} from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
    <div className="min-h-screen w-full flex bg-[#FFFFFF] text-[#2F2B3D] font-sans relative overflow-hidden select-none">
      
      {/* ======================================================== */}
      {/* LEFT SECTION: 3D Illustration & Floating Metric Cards   */}
      {/* ======================================================== */}
      <div className="hidden lg:flex lg:w-3/5 bg-[#F8F7FA] relative items-center justify-center p-8 overflow-hidden border-r border-[#E6E6EC]">
        
        {/* Vuexy Brand Logo & Title (Top-Left) */}
        <div className="absolute top-8 left-9 flex items-center gap-3 z-30">
          <div className="w-8 h-8 rounded-lg bg-[#7367F0] flex items-center justify-center text-white shadow-sm shadow-[#7367F0]/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3.5L3.5 12L12 20.5L20.5 12L12 3.5Z" fill="white" fillOpacity="0.2"/>
              <path d="M7 8.5L12 16.5L17 8.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-[#2F2B3D] tracking-tight">
            Vuexy
          </span>
        </div>

        {/* Ambient Halo Circular Rings */}
        <div className="absolute w-[460px] h-[460px] rounded-full border border-[#7367F0]/15 bg-gradient-to-tr from-[#7367F0]/5 to-transparent flex items-center justify-center pointer-events-none">
          <div className="w-[330px] h-[330px] rounded-full border border-[#7367F0]/20 bg-white/40 shadow-inner"></div>
        </div>

        {/* Floating Card 1: Profit (Top-Left) */}
        <div 
          className="absolute top-24 left-16 z-20 bg-white p-4 rounded-xl border border-[#EBE9F1] w-44 transition-all duration-300 hover:scale-105"
          style={{ boxShadow: '0 4px 18px 0 rgba(47, 43, 61, 0.08)' }}
        >
          <p className="text-xs font-semibold text-[#2F2B3D]">Profit</p>
          <p className="text-[11px] text-[#A5A3AE] mb-1.5">Last Month</p>
          
          {/* Smooth Cyan Sparkline */}
          <div className="h-9 my-1">
            <svg viewBox="0 0 100 32" className="w-full h-full overflow-visible">
              <path
                d="M 4 25 L 22 13 L 42 22 L 62 8 L 80 18 L 96 4"
                fill="none"
                stroke="#00CFE8"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="96" cy="4" r="3.5" fill="#00CFE8" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex items-center justify-between mt-1 pt-1 border-t border-[#F1F0F2]">
            <span className="text-base font-bold text-[#2F2B3D]">624k</span>
            <span className="text-[10px] text-[#28C76F] font-bold bg-[#28C76F]/15 px-1.5 py-0.5 rounded">
              +8.24%
            </span>
          </div>
        </div>

        {/* Center 3D Character Illustration */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <img 
            src="/assets/vuexy-character.jpg" 
            alt="Vuexy 3D Character" 
            className="w-72 sm:w-80 h-auto object-contain drop-shadow-xl select-none"
          />
        </div>

        {/* Floating Card 2: Order (Bottom-Right) */}
        <div 
          className="absolute bottom-24 right-16 z-20 bg-white p-4 rounded-xl border border-[#EBE9F1] w-44 transition-all duration-300 hover:scale-105"
          style={{ boxShadow: '0 4px 18px 0 rgba(47, 43, 61, 0.08)' }}
        >
          <p className="text-xs font-semibold text-[#2F2B3D]">Order</p>
          <p className="text-[11px] text-[#A5A3AE] mb-1.5">Last week</p>
          
          {/* Vertical Bar Graph */}
          <div className="h-9 flex items-end justify-between gap-1 px-1 my-1">
            <div className="w-2 h-7 bg-[#7367F0] rounded-t-xs"></div>
            <div className="w-2 h-4 bg-[#7367F0]/40 rounded-t-xs"></div>
            <div className="w-2 h-8 bg-[#7367F0] rounded-t-xs"></div>
            <div className="w-2 h-3 bg-[#7367F0]/30 rounded-t-xs"></div>
            <div className="w-2 h-7 bg-[#7367F0] rounded-t-xs"></div>
            <div className="w-2 h-5 bg-[#7367F0]/60 rounded-t-xs"></div>
            <div className="w-2 h-9 bg-[#7367F0] rounded-t-xs"></div>
          </div>

          <div className="flex items-center justify-between mt-1 pt-1 border-t border-[#F1F0F2]">
            <span className="text-base font-bold text-[#2F2B3D]">124k</span>
            <span className="text-[10px] text-[#28C76F] font-bold bg-[#28C76F]/15 px-1.5 py-0.5 rounded">
              +12.6%
            </span>
          </div>
        </div>

        {/* Subtle Wave Curve at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none opacity-30">
          <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <path fill="#ffffff" d="M0,192L80,186.7C160,181,320,171,480,181.3C640,192,800,224,960,224C1120,224,1280,192,1360,176L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>

      </div>

      {/* ======================================================== */}
      {/* RIGHT SECTION: Vuexy Authentication Form                 */}
      {/* ======================================================== */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center px-6 sm:px-12 md:px-14 lg:px-12 xl:px-16 py-10 relative bg-white">
        
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#7367F0] flex items-center justify-center text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M7 8.5L12 16.5L17 8.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-[#2F2B3D]">Vuexy</span>
        </div>

        <div className="max-w-[400px] w-full mx-auto space-y-4">
          
          {/* Header Title */}
          <div>
            <h2 className="text-[22px] sm:text-2xl font-semibold text-[#2F2B3D] tracking-tight flex items-center gap-1.5">
              Welcome to Vuexy! <span className="inline-block text-xl">👋</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#6F6B7D] mt-0.5">
              Please sign-in to your account and start the adventure
            </p>
          </div>

          {/* Quick Demo Credentials Box */}
          <div className="p-3 rounded-lg bg-[#F4F3FF] border border-[#E8E6FB] space-y-1.5 text-xs text-[#5E5873]">
            <div 
              onClick={() => fillCredentials('admin@demo.com', 'admin')}
              className="flex items-center justify-between cursor-pointer hover:text-[#7367F0] transition-colors py-0.5"
            >
              <div>
                <span>Admin Email: </span>
                <strong className="text-[#7367F0] font-semibold">admin@demo.com</strong>
                <span> / Pass: </span>
                <strong className="text-[#7367F0] font-semibold">admin</strong>
              </div>
            </div>
            <div 
              onClick={() => fillCredentials('client@demo.com', 'client')}
              className="flex items-center justify-between cursor-pointer hover:text-[#7367F0] transition-colors py-0.5"
            >
              <div>
                <span>Client Email: </span>
                <strong className="text-[#7367F0] font-semibold">client@demo.com</strong>
                <span> / Pass: </span>
                <strong className="text-[#7367F0] font-semibold">client</strong>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
            
            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-[#2F2B3D]">
                Email
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@demo.com"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-md border border-[#DBDADE] bg-white text-[#2F2B3D] placeholder-[#A5A3AE] focus:border-[#7367F0] focus:ring-1 focus:ring-[#7367F0] outline-none transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-[#2F2B3D]">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="············"
                  className="w-full px-3 py-2 pr-9 text-xs sm:text-sm rounded-md border border-[#DBDADE] bg-white text-[#2F2B3D] placeholder-[#A5A3AE] focus:border-[#7367F0] focus:ring-1 focus:ring-[#7367F0] outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 text-[#A5A3AE] hover:text-[#5D596C] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#6F6B7D]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-[#7367F0] focus:ring-0 accent-[#7367F0] cursor-pointer"
                />
                <span>Remember me</span>
              </label>
              <a 
                href="#forgot" 
                onClick={(e) => { e.preventDefault(); fillCredentials('admin@demo.com', 'admin'); }}
                className="text-xs text-[#7367F0] hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-md bg-[#7367F0] hover:bg-[#685DD8] active:bg-[#5E50EE] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-sm shadow-[#7367F0]/30 hover:shadow-md transition-all cursor-pointer"
            >
              Login
            </button>
          </form>

          {/* New on our platform */}
          <p className="text-center text-xs text-[#6F6B7D] pt-0.5">
            New on our platform?{' '}
            <a
              href="#signup"
              onClick={(e) => {
                e.preventDefault();
                onLogin({ email: 'newuser@demo.com', role: 'User' });
              }}
              className="text-[#7367F0] hover:underline"
            >
              Create an account
            </a>
          </p>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-1">
            <div className="border-t border-[#DBDADE] w-full"></div>
            <span className="bg-white px-2.5 text-[11px] text-[#A5A3AE] uppercase absolute">
              or
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onLogin({ email: 'facebook@demo.com', role: 'Social User' })}
              className="w-8 h-8 rounded-md bg-[#F4F3FF] text-[#497CE2] hover:bg-[#497CE2] hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
              title="Sign in with Facebook"
            >
              f
            </button>
            <button
              type="button"
              onClick={() => onLogin({ email: 'twitter@demo.com', role: 'Social User' })}
              className="w-8 h-8 rounded-md bg-[#F4F3FF] text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-colors"
              title="Sign in with Twitter"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onLogin({ email: 'github@demo.com', role: 'Developer' })}
              className="w-8 h-8 rounded-md bg-[#F4F3FF] text-[#2F2B3D] hover:bg-[#2F2B3D] hover:text-white flex items-center justify-center transition-colors"
              title="Sign in with GitHub"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onLogin({ email: 'google@demo.com', role: 'Google User' })}
              className="w-8 h-8 rounded-md bg-[#F4F3FF] text-[#EA5455] hover:bg-[#EA5455] hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
              title="Sign in with Google"
            >
              G
            </button>
          </div>

        </div>

        {/* Floating 'Buy Now' button in bottom right corner (opens ThemeForest Vuexy template) */}
        <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
          <a 
            href="https://themeforest.net/item/vuexy-vuejs-html-laravel-admin-dashboard-template/23328599"
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-white font-semibold text-xs transition-all transform hover:-translate-y-0.5 cursor-pointer no-underline"
            style={{
              background: '#EA5455',
              boxShadow: '0 4px 18px 0 rgba(234, 84, 85, 0.45)'
            }}
          >
            Buy Now
          </a>
        </div>

      </div>

    </div>
  );
}
