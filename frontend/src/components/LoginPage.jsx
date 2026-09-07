import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  BarChart3, 
  Globe2, 
  Layers, 
  CheckCircle2,
  Database,
  Cpu
} from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin({ 
        email: email || 'admin@demo.com', 
        role: (email || '').toLowerCase().includes('admin') ? 'Senior Administrator' : 'Lead Analyst' 
      });
      setIsLoading(false);
    }, 400);
  };

  const fillCredentials = (userEmail, userPass) => {
    setEmail(userEmail);
    setPassword(userPass);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#0f172a] font-sans text-slate-100 relative overflow-hidden select-none">
      
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-40 w-[30rem] h-[30rem] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Grid Container */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row min-h-screen">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: Brand Story & Live Analytics Showcase        */}
        {/* ========================================================= */}
        <div className="hidden lg:flex lg:w-7/12 flex-col justify-between p-12 xl:p-16 border-r border-slate-800/80 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 backdrop-blur-xl">
          
          {/* Top Branding Header */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-sky-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-sky-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white font-heading">
                  Blackcoffer
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full">
                  Analytics v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400">Global Strategic Intelligence & Data Visualization</p>
            </div>
          </div>

          {/* Center Showcase: Interactive Metric Cards & Visual Highlights */}
          <div className="my-auto py-10 space-y-8 max-w-xl">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-sky-300 shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                <span>Real-Time Multi-Dimensional Visualizations</span>
              </div>
              <h1 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Turn Complex Global Trends into Actionable Decisions.
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                Connect to live multi-variable aggregations across Intensity, Likelihood, Relevance, Sector distributions, and D3 force physics simulation.
              </p>
            </div>

            {/* Live Interactive Analytics Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Metric Card 1 */}
              <div className="p-4.5 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-md hover:border-sky-500/40 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400">Global Universe</span>
                  <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                    <Database className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-white">1,000</span>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    MongoDB Ready
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">9 Multi-select Filter Dimensions</p>
              </div>

              {/* Metric Card 2 */}
              <div className="p-4.5 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-md hover:border-indigo-500/40 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400">D3 Physics Cluster</span>
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-white">60 FPS</span>
                  <span className="text-[11px] font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                    Force Physics
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Dynamic Collision & Drag Simulation</p>
              </div>

            </div>

            {/* Feature Highlights Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/60 border border-slate-700/40 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Timeline Intensity Forecasting</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/60 border border-slate-700/40 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Likelihood Matrix</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/60 border border-slate-700/40 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>PESTLE & SWOT Analysis</span>
              </span>
            </div>

          </div>

          {/* Bottom Trust & Compliance Footer */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-6 border-t border-slate-800/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Enterprise-Grade REST API & Data Encryption</span>
            </div>
            <span>© {new Date().getFullYear()} Blackcoffer Insights</span>
          </div>

        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Sleek Glassmorphic Login Form               */}
        {/* ========================================================= */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-12 xl:px-16 py-12 bg-slate-900/40 backdrop-blur-2xl">
          
          {/* Mobile Logo Banner */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-sky-500/30">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-tight">Blackcoffer</span>
              <p className="text-[11px] text-slate-400">Data Visualization Portal</p>
            </div>
          </div>

          <div className="max-w-md w-full mx-auto space-y-6">
            
            {/* Form Title & Greeting */}
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Sign In to Dashboard
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Enter your credentials or choose a quick demo role below.
              </p>
            </div>

            {/* Quick Demo Access Quick-Select Tabs */}
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1">
                <span>Instant Demo Access</span>
                <span className="text-sky-400 flex items-center gap-1 font-mono lowercase">click to autofill</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => fillCredentials('admin@demo.com', 'admin123')}
                  className="flex flex-col items-start p-2.5 rounded-lg bg-slate-900/80 hover:bg-sky-950/50 border border-slate-700 hover:border-sky-500/50 transition-all text-left group cursor-pointer"
                >
                  <span className="text-xs font-bold text-white group-hover:text-sky-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                    Admin Role
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono mt-0.5">admin@demo.com</span>
                </button>

                <button
                  type="button"
                  onClick={() => fillCredentials('analyst@demo.com', 'analyst123')}
                  className="flex flex-col items-start p-2.5 rounded-lg bg-slate-900/80 hover:bg-indigo-950/50 border border-slate-700 hover:border-indigo-500/50 transition-all text-left group cursor-pointer"
                >
                  <span className="text-xs font-bold text-white group-hover:text-indigo-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                    Analyst Role
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono mt-0.5">analyst@demo.com</span>
                </button>
              </div>
            </div>

            {/* Authentication Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Business Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      fillCredentials('admin@demo.com', 'admin123');
                    }}
                    className="text-xs font-medium text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400 hover:text-slate-300 transition-colors">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-0 accent-sky-500 cursor-pointer"
                  />
                  <span>Keep me signed in for 30 days</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer transform active:scale-[0.99] disabled:opacity-60"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Enter Analytics Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Platform Status Indicator */}
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>API Server Active</span>
              </div>
              <span className="font-mono text-[11px] text-slate-500">Port :5000</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
