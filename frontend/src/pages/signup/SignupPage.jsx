import React, { useState } from 'react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    email: '',
    password: '',
  });

  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing again
    if (status.error) setStatus({ ...status, error: null });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // credentials: 'include' is the FETCH version of withCredentials: true
        // It's mandatory for receiving and sending HttpOnly cookies
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      // Fetch doesn't throw on 404 or 500, so we check response.ok (status 200-299)
      const data = await response.json();

      if (!response.ok) {
        // If the backend sent a specific error message, use it
        throw new Error(data.message || `Error: ${response.status}`);
      }

      // Success (Status 201)
      setStatus({ loading: false, error: null, success: true });
      console.log('Registration successful:', data.message);

      // Redirect to dashboard
      window.location.href = '/dashboard';

    } catch (err) {
      // Catching both network errors and the errors we threw above
      setStatus({
        loading: false,
        error: err.message || 'An unexpected connection error occurred',
        success: false
      });
    }
  };

  return (
    <main className="min-h-screen flex font-sans text-[#161616] bg-white selection:bg-[#0f62fe] selection:text-white">

      {/* LEFT PANEL - IBM Carbon Dark (Unchanged logic, just keeping the vibe) */}
      <section className="hidden lg:flex lg:w-1/2 bg-[#161616] text-white p-16 flex-col justify-between border-r border-[#393939]">
        <div>
          <h1 className="text-4xl font-light tracking-tight mb-8">
            Sim<span className="font-semibold">Chat</span>
          </h1>
          <h2 className="text-2xl font-light leading-snug max-w-lg mb-12">
            Professional-grade collaboration. Built for scale.
          </h2>
          {/* ... Features would go here ... */}
        </div>
        <div className="text-sm text-[#8d8d8d]">
          &copy; {new Date().getFullYear()} SimChat Systems. IBM Design Language Inspired.
        </div>
      </section>

      {/* RIGHT PANEL - Form with Error Handling */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md">

          <div className="mb-10">
            <h2 className="text-3xl font-normal mb-2 tracking-tight">Create an account</h2>
            <p className="text-[#525252] text-sm">
              Join the future of team communication.
            </p>
          </div>

          {/* Error Notification Block (IBM Style) */}
          {status.error && (
            <div className="bg-[#fff0f0] border-l-4 border-[#da1e28] p-4 mb-6 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-[#da1e28] uppercase tracking-wider">Registration Error</p>
                <p className="text-sm text-[#161616]">{status.error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input fields - using the same IBM styling you had */}
            {[
              { label: 'Display name', name: 'displayName', type: 'text', placeholder: 'John Doe' },
              { label: 'Username', name: 'username', type: 'text', placeholder: 'john_doe' },
              { label: 'Email address', name: 'email', type: 'email', placeholder: 'name@company.com' },
              { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' }
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm mb-2 text-[#525252]">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  disabled={status.loading}
                  className="w-full bg-[#f4f4f4] border-b border-[#8d8d8d] text-[#161616] px-4 py-3 outline-none focus:border-[#0f62fe] focus:border-b-2 transition-all placeholder-[#a8a8a8] disabled:opacity-50"
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            {/* Submit Button with Loading State */}
            <button
              type="submit"
              disabled={status.loading}
              className={`w-full ${status.loading ? 'bg-[#525252]' : 'bg-[#0f62fe] hover:bg-[#0353e9]'} text-white py-4 px-4 flex justify-between items-center transition-colors group mt-8 focus:outline-none focus:ring-2 focus:ring-[#0f62fe]`}
            >
              <span className="text-sm font-medium">
                {status.loading ? 'Registering...' : 'Register'}
              </span>
              {!status.loading && (
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              )}
            </button>

            <p className="text-xs text-[#525252] mt-4 leading-relaxed">
              By registering, you agree to our <span className="text-[#0f62fe] cursor-pointer">Terms</span> and <span className="text-[#0f62fe] cursor-pointer">Data Privacy</span> standards.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default SignupPage;
