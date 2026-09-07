import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

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
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#ffffff',
      color: '#2F2B3D',
      fontFamily: "'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      {/* ======================================================== */}
      {/* LEFT SECTION: 3D Visual Showcase & Floating Cards        */}
      {/* ======================================================== */}
      <div 
        className="vuexy-login-left hidden md:flex"
        style={{
          flex: '1.2',
          backgroundColor: '#F8F7FA',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
          overflow: 'hidden',
          borderRight: '1px solid #E6E6EC'
        }}
      >
        {/* Vuexy Brand Logo & Title (Top-Left) */}
        <div style={{
          position: 'absolute',
          top: '32px',
          left: '36px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 30
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: '#7367F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(115, 103, 240, 0.35)'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M7 8.5L12 16.5L17 8.5" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#2F2B3D',
            letterSpacing: '-0.3px'
          }}>
            Vuexy
          </span>
        </div>

        {/* Ambient Halo Rings */}
        <div style={{
          position: 'absolute',
          width: '460px',
          height: '460px',
          borderRadius: '50%',
          border: '1px solid rgba(115, 103, 240, 0.12)',
          background: 'radial-gradient(circle, rgba(115,103,240,0.05) 0%, rgba(255,255,255,0) 70%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}>
          <div style={{
            width: '330px',
            height: '330px',
            borderRadius: '50%',
            border: '1px solid rgba(115, 103, 240, 0.18)',
            backgroundColor: 'rgba(255, 255, 255, 0.45)'
          }}></div>
        </div>

        {/* Floating Card 1: Profit (Top-Left) */}
        <div style={{
          position: 'absolute',
          top: '12%',
          left: '10%',
          zIndex: 20,
          backgroundColor: '#ffffff',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid #EBE9F1',
          width: '180px',
          boxShadow: '0 4px 18px 0 rgba(47, 43, 61, 0.08)',
          transition: 'transform 0.3s ease'
        }}>
          <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#2F2B3D' }}>Profit</p>
          <p style={{ margin: '2px 0 8px', fontSize: '11px', color: '#A5A3AE' }}>Last Month</p>
          
          {/* Smooth Cyan Sparkline */}
          <div style={{ height: '38px', margin: '4px 0' }}>
            <svg viewBox="0 0 100 32" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <path
                d="M 4 25 L 22 13 L 42 22 L 62 8 L 80 18 L 96 4"
                fill="none"
                stroke="#00CFE8"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="96" cy="4" r="3.5" fill="#00CFE8" stroke="#ffffff" strokeWidth="2.5" />
            </svg>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '6px',
            paddingTop: '6px',
            borderTop: '1px solid #F1F0F2'
          }}>
            <span style={{ fontSize: '17px', fontWeight: 700, color: '#2F2B3D' }}>624k</span>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#28C76F',
              backgroundColor: 'rgba(40, 199, 111, 0.14)',
              padding: '2px 6px',
              borderRadius: '4px'
            }}>
              +8.24%
            </span>
          </div>
        </div>

        {/* Center 3D Character Illustration */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none'
        }}>
          <img 
            src="/assets/vuexy-character.jpg" 
            alt="Vuexy 3D Character" 
            style={{
              width: '320px',
              height: 'auto',
              maxHeight: '68vh',
              objectFit: 'contain',
              filter: 'drop-shadow(0 15px 25px rgba(47, 43, 61, 0.15))'
            }}
          />
        </div>

        {/* Floating Card 2: Order (Bottom-Right) */}
        <div style={{
          position: 'absolute',
          bottom: '12%',
          right: '10%',
          zIndex: 20,
          backgroundColor: '#ffffff',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid #EBE9F1',
          width: '180px',
          boxShadow: '0 4px 18px 0 rgba(47, 43, 61, 0.08)',
          transition: 'transform 0.3s ease'
        }}>
          <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#2F2B3D' }}>Order</p>
          <p style={{ margin: '2px 0 8px', fontSize: '11px', color: '#A5A3AE' }}>Last week</p>
          
          {/* Vertical Bar Graph */}
          <div style={{
            height: '38px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '5px',
            padding: '0 4px',
            margin: '4px 0'
          }}>
            <div style={{ width: '8px', height: '26px', backgroundColor: '#7367F0', borderRadius: '2px 2px 0 0' }}></div>
            <div style={{ width: '8px', height: '14px', backgroundColor: 'rgba(115, 103, 240, 0.4)', borderRadius: '2px 2px 0 0' }}></div>
            <div style={{ width: '8px', height: '30px', backgroundColor: '#7367F0', borderRadius: '2px 2px 0 0' }}></div>
            <div style={{ width: '8px', height: '10px', backgroundColor: 'rgba(115, 103, 240, 0.3)', borderRadius: '2px 2px 0 0' }}></div>
            <div style={{ width: '8px', height: '25px', backgroundColor: '#7367F0', borderRadius: '2px 2px 0 0' }}></div>
            <div style={{ width: '8px', height: '18px', backgroundColor: 'rgba(115, 103, 240, 0.6)', borderRadius: '2px 2px 0 0' }}></div>
            <div style={{ width: '8px', height: '34px', backgroundColor: '#7367F0', borderRadius: '2px 2px 0 0' }}></div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '6px',
            paddingTop: '6px',
            borderTop: '1px solid #F1F0F2'
          }}>
            <span style={{ fontSize: '17px', fontWeight: 700, color: '#2F2B3D' }}>124k</span>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#28C76F',
              backgroundColor: 'rgba(40, 199, 111, 0.14)',
              padding: '2px 6px',
              borderRadius: '4px'
            }}>
              +12.6%
            </span>
          </div>
        </div>

        {/* Subtle Wave Backdrop */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          pointerEvents: 'none',
          opacity: 0.35
        }}>
          <svg viewBox="0 0 1440 320" style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
            <path fill="#ffffff" d="M0,192L80,186.7C160,181,320,171,480,181.3C640,192,800,224,960,224C1120,224,1280,192,1360,176L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>

      </div>

      {/* ======================================================== */}
      {/* RIGHT SECTION: Vuexy Login Form                          */}
      {/* ======================================================== */}
      <div style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 24px',
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        boxSizing: 'border-box'
      }}>
        
        {/* Mobile Header Logo */}
        <div className="flex md:hidden" style={{
          alignItems: 'center',
          gap: '10px',
          marginBottom: '28px',
          alignSelf: 'flex-start',
          maxWidth: '400px',
          width: '100%',
          margin: '0 auto 24px auto'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '7px',
            backgroundColor: '#7367F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M7 8.5L12 16.5L17 8.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontSize: '20px', fontWeight: 700, color: '#2F2B3D' }}>Vuexy</span>
        </div>

        <div style={{
          maxWidth: '400px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          
          {/* Header Title */}
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{
              margin: '0 0 6px 0',
              fontSize: '24px',
              fontWeight: 600,
              color: '#2F2B3D',
              letterSpacing: '-0.2px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              Welcome to Vuexy! <span style={{ fontSize: '22px' }}>👋</span>
            </h2>
            <p style={{
              margin: 0,
              fontSize: '13.5px',
              color: '#6F6B7D',
              lineHeight: 1.5
            }}>
              Please sign-in to your account and start the adventure
            </p>
          </div>

          {/* Quick Demo Credentials Box */}
          <div style={{
            backgroundColor: '#F4F3FF',
            border: '1px solid #E8E6FB',
            borderRadius: '6px',
            padding: '12px 14px',
            marginBottom: '16px',
            fontSize: '13px',
            color: '#5E5873',
            lineHeight: 1.6
          }}>
            <div 
              onClick={() => fillCredentials('admin@demo.com', 'admin')}
              style={{
                cursor: 'pointer',
                marginBottom: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>
                Admin Email: <strong style={{ color: '#7367F0', fontWeight: 600 }}>admin@demo.com</strong> / Pass: <strong style={{ color: '#7367F0', fontWeight: 600 }}>admin</strong>
              </span>
            </div>
            
            <div 
              onClick={() => fillCredentials('client@demo.com', 'client')}
              style={{
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>
                Client Email: <strong style={{ color: '#7367F0', fontWeight: 600 }}>client@demo.com</strong> / Pass: <strong style={{ color: '#7367F0', fontWeight: 600 }}>client</strong>
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Email Field */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                color: '#2F2B3D',
                marginBottom: '6px'
              }}>
                Email
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@demo.com"
                style={{
                  width: '100%',
                  height: '38px',
                  padding: '8px 12px',
                  fontSize: '13.5px',
                  borderRadius: '6px',
                  border: '1px solid #DBDADE',
                  backgroundColor: '#ffffff',
                  color: '#2F2B3D',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#7367F0';
                  e.target.style.boxShadow = '0 0 0 3px rgba(115, 103, 240, 0.12)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#DBDADE';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                color: '#2F2B3D',
                marginBottom: '6px'
              }}>
                Password
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="············"
                  style={{
                    width: '100%',
                    height: '38px',
                    padding: '8px 36px 8px 12px',
                    fontSize: '13.5px',
                    borderRadius: '6px',
                    border: '1px solid #DBDADE',
                    backgroundColor: '#ffffff',
                    color: '#2F2B3D',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#7367F0';
                    e.target.style.boxShadow = '0 0 0 3px rgba(115, 103, 240, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#DBDADE';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    color: '#A5A3AE',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '-2px'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#6F6B7D',
                userSelect: 'none'
              }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    width: '15px',
                    height: '15px',
                    borderRadius: '4px',
                    accentColor: '#7367F0',
                    cursor: 'pointer'
                  }}
                />
                <span>Remember me</span>
              </label>
              
              <a 
                href="#forgot" 
                onClick={(e) => { e.preventDefault(); fillCredentials('admin@demo.com', 'admin'); }}
                style={{
                  fontSize: '13px',
                  color: '#7367F0',
                  textDecoration: 'none',
                  fontWeight: 500
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                height: '40px',
                borderRadius: '6px',
                backgroundColor: '#7367F0',
                color: '#ffffff',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.2px',
                boxShadow: '0 2px 6px rgba(115, 103, 240, 0.4)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s, box-shadow 0.2s, transform 0.1s',
                marginTop: '4px'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#685DD8';
                e.target.style.boxShadow = '0 4px 12px rgba(115, 103, 240, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#7367F0';
                e.target.style.boxShadow = '0 2px 6px rgba(115, 103, 240, 0.4)';
              }}
            >
              Login
            </button>
          </form>

          {/* New on our platform? Create an account */}
          <div style={{
            textAlign: 'center',
            fontSize: '13.5px',
            color: '#6F6B7D',
            marginTop: '16px',
            marginBottom: '16px'
          }}>
            New on our platform?{' '}
            <a
              href="#signup"
              onClick={(e) => {
                e.preventDefault();
                onLogin({ email: 'newuser@demo.com', role: 'User' });
              }}
              style={{
                color: '#7367F0',
                textDecoration: 'none',
                fontWeight: 500
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              Create an account
            </a>
          </div>

          {/* Divider with "or" */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px',
            width: '100%'
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#DBDADE' }}></div>
            <span style={{
              padding: '0 12px',
              fontSize: '11px',
              fontWeight: 600,
              color: '#A5A3AE',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              or
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#DBDADE' }}></div>
          </div>

          {/* Social Icons Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            {/* Facebook */}
            <button
              type="button"
              onClick={() => onLogin({ email: 'facebook@demo.com', role: 'Social User' })}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                backgroundColor: '#F4F3FF',
                color: '#497CE2',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 700,
                transition: 'background-color 0.2s, color 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#497CE2'; e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F4F3FF'; e.currentTarget.style.color = '#497CE2'; }}
              title="Sign in with Facebook"
            >
              f
            </button>

            {/* Twitter */}
            <button
              type="button"
              onClick={() => onLogin({ email: 'twitter@demo.com', role: 'Social User' })}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                backgroundColor: '#F4F3FF',
                color: '#1DA1F2',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s, color 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1DA1F2'; e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F4F3FF'; e.currentTarget.style.color = '#1DA1F2'; }}
              title="Sign in with Twitter"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={() => onLogin({ email: 'github@demo.com', role: 'Developer' })}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                backgroundColor: '#F4F3FF',
                color: '#2F2B3D',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s, color 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#2F2B3D'; e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F4F3FF'; e.currentTarget.style.color = '#2F2B3D'; }}
              title="Sign in with GitHub"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </button>

            {/* Google */}
            <button
              type="button"
              onClick={() => onLogin({ email: 'google@demo.com', role: 'Google User' })}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                backgroundColor: '#F4F3FF',
                color: '#EA5455',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 700,
                transition: 'background-color 0.2s, color 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#EA5455'; e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F4F3FF'; e.currentTarget.style.color = '#EA5455'; }}
              title="Sign in with Google"
            >
              G
            </button>
          </div>

        </div>

        {/* Floating 'Buy Now' button in bottom right (opens ThemeForest Vuexy template) */}
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 50
        }}>
          <a 
            href="https://themeforest.net/item/vuexy-vuejs-html-laravel-admin-dashboard-template/23328599"
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 18px',
              borderRadius: '8px',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '13px',
              textDecoration: 'none',
              backgroundColor: '#FF4C51',
              boxShadow: '0 4px 18px 0 rgba(255, 76, 81, 0.45)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 22px 0 rgba(255, 76, 81, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 18px 0 rgba(255, 76, 81, 0.45)';
            }}
          >
            Buy Now
          </a>
        </div>

      </div>

    </div>
  );
}
