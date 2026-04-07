import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../GlobalContext/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * FormField Component - Optimized for performance and Carbon Design aesthetics
 */
const FormField = React.memo(({ label, name, type, value, onChange, placeholder, disabled }) => (
  <div className="flex flex-col space-y-1.5">
    <label
      htmlFor={name}
      className="text-[12px] text-[#525252] font-medium tracking-[0.16px]"
    >
      {label}
    </label>
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        disabled={disabled}
        autoComplete={type === 'password' ? 'new-password' : 'on'}
        className="w-full bg-[#f4f4f4] border-b border-[#8d8d8d] text-[#161616] px-4 py-3 text-sm
                 outline-none focus:border-[#0f62fe] focus:ring-[1px] focus:ring-[#0f62fe]
                 transition-all placeholder-[#a8a8a8] disabled:opacity-50 disabled:cursor-not-allowed
                 hover:bg-[#e5e5e5]"
      />
    </div>
  </div>
));

const SignupPage = () => {
  const { isLoggedIn, setaccessToken } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    email: '',
    password: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null
  });

  const formFields = useMemo(() => [
    { label: 'Display name', name: 'displayName', type: 'text', placeholder: 'e.g. Jane Doe' },
    { label: 'Username', name: 'username', type: 'text', placeholder: 'jane_doe' },
    { label: 'Email address', name: 'email', type: 'email', placeholder: 'jane@company.com' },
    { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' }
  ], []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (status.error) setStatus(prev => ({ ...prev, error: null }));
  }, [status.error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null });

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Registration failed (${response.status})`);
      }

      if (data.accessToken) {
        setaccessToken(data.accessToken);
        // Successful Navigation
        navigate('/dashboard');
      }
    } catch (err) {
      setStatus({
        loading: false,
        error: err.message || 'Connection error. Please check your network.',
      });
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="min-h-screen flex font-sans text-[#161616] bg-white selection:bg-[#0f62fe] selection:text-white">

      {/* Left Panel: Brand Identity */}
      <aside className="hidden lg:flex lg:w-[40%] bg-[#161616] text-white p-12 flex-col justify-between border-r border-[#393939]">
        <header>
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-[#0f62fe]"></div>
            <h1 className="text-2xl font-light tracking-tight">
              Sim<span className="font-semibold">Chat</span>
            </h1>
          </div>
          <h2 className="text-4xl font-light leading-[1.2] max-w-md">
            Design for the <br />
            <span className="text-[#0f62fe] font-normal italic">Enterprise.</span>
          </h2>
          <p className="mt-6 text-[#a8a8a8] max-w-sm leading-relaxed text-sm">
            Access secure, encrypted channels and real-time collaboration
            built on our proprietary distributed architecture.
          </p>
        </header>

        <footer className="space-y-4">
          <div className="flex gap-6 text-[11px] text-[#8d8d8d] uppercase tracking-widest">
            <span className="hover:text-white cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-white cursor-pointer transition-colors">Support</span>
          </div>
          <p className="text-[11px] text-[#525252] uppercase tracking-widest">
            &copy; {new Date().getFullYear()} SimChat Systems Inc.
          </p>
        </footer>
      </aside>

      {/* Right Panel: Functional Core */}
      <section className="w-full lg:w-[60%] flex items-center justify-center p-6 bg-[#ffffff]">
        <div className="w-full max-w-[400px]">
          <header className="mb-10">
            <h2 className="text-[32px] font-light mb-2 tracking-[-0.5px]">Create Account</h2>
            <p className="text-[#525252] text-sm">
              Already have a SimChat ID?
              <Link to="/login" className="ml-1 text-[#0f62fe] hover:underline transition-all">
                Log in
              </Link>
            </p>
          </header>

          {/* Error Notification */}
          {status.error && (
            <div
              className="bg-[#fff0f0] border-l-4 border-[#da1e28] p-4 mb-8 flex justify-between items-start animate-in fade-in slide-in-from-top-2"
              role="alert"
            >
              <div>
                <p className="text-[10px] font-bold text-[#da1e28] uppercase tracking-[1px]">Validation Error</p>
                <p className="text-sm text-[#161616] mt-1">{status.error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5">
              {formFields.map((field) => (
                <FormField
                  key={field.name}
                  {...field}
                  value={formData[field.name]}
                  onChange={handleChange}
                  disabled={status.loading}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className={`group w-full h-[48px] px-4 mt-10 flex justify-between items-center transition-all duration-150
                ${status.loading ? 'bg-[#525252] cursor-not-allowed' : 'bg-[#0f62fe] hover:bg-[#0353e9] active:bg-[#002d9c]'}
                text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0f62fe]`}
            >
              <span className="text-sm font-medium tracking-[0.16px]">
                {status.loading ? 'Processing...' : 'Create Account'}
              </span>
              {!status.loading && (
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:translate-x-1">
                  <path d="M18 6L16.57 7.393L24.15 15H4V17H24.15L16.57 24.573L18 26L28 16L18 6Z" fill="white"/>
                </svg>
              )}
            </button>
          </form>

          <footer className="mt-12 pt-8 border-t border-[#e0e0e0]">
            <p className="text-[12px] text-[#8d8d8d] leading-relaxed">
              By continuing, you agree to the SimChat
              <a href="/terms" className="text-[#0f62fe] mx-1 hover:underline">Terms of Use</a>
              and acknowledge the
              <a href="/privacy" className="text-[#0f62fe] ml-1 hover:underline">Privacy Statement</a>.
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
};

export default SignupPage;
