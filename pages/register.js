// pages/register.js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { register, resetRegistration, clearError } from '../store/authSlice';

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { registrationSuccess, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (registrationSuccess) {
      const redirectTimer = setTimeout(() => {
        dispatch(resetRegistration());
        router.push('/login');
      }, 3000);
      return () => clearTimeout(redirectTimer);
    }
  }, [registrationSuccess, router, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { confirmPassword, ...userData } = formData;
      dispatch(register(userData));
    }
  };

  const toggleMoreInfo = () => {
    setShowMoreInfo(!showMoreInfo);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Info Panel */}
      <div className="w-1/2 bg-gradient-to-b from-blue-500 to-blue-900 flex flex-col justify-center items-start p-16">
        <div className="z-10 max-w-md">
          <h1 className="text-5xl font-bold text-white mb-2">GoFinance</h1>
          <p className="text-white/80 mb-6">Smart financial solutions for your future</p>
          <button 
            onClick={toggleMoreInfo}
            className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-2 rounded-full text-sm mb-6"
          >
            {showMoreInfo ? 'Show Less' : 'Show More'}
          </button>

          {showMoreInfo && (
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <h3 className="text-white font-semibold text-lg mb-2">Why Choose GoFinance?</h3>
                <ul className="space-y-2 text-white/90">
                  <li className="flex items-center"><span className="mr-2 text-green-300">✓</span> Secure and encrypted data protection</li>
                  <li className="flex items-center"><span className="mr-2 text-green-300">✓</span> Real-time financial tracking and insights</li>
                  <li className="flex items-center"><span className="mr-2 text-green-300">✓</span> Personalized investment recommendations</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '💸', title: 'Budget Tracking', desc: 'Set goals and track your spending' },
                  { icon: '📈', title: 'Investments', desc: 'Grow your wealth strategically' },
                  { icon: '📊', title: 'Reports', desc: 'Detailed financial reports' },
                  { icon: '👪', title: 'Family Accounts', desc: 'Manage finances together' },
                ].map((feature, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-blue-400/30 flex items-center justify-center mb-2">
                      {feature.icon}
                    </div>
                    <h4 className="text-white text-sm font-medium">{feature.title}</h4>
                    <p className="text-white/70 text-xs text-center mt-1">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="z-10 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-blue-300 flex items-center justify-center flex-shrink-0 mr-3">
                  <span className="text-blue-800 font-semibold">SJ</span>
                </div>
                <div>
                  <p className="text-white/90 text-sm italic">
                    "GoFinance transformed how I manage my money. I've saved 30% more since using this app!"
                  </p>
                  <p className="text-white/70 text-xs mt-2">— Sarah Johnson, Small Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="w-1/2 bg-white p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-600">Sign up to get started</p>
          </div>

          {registrationSuccess && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-lg">
              Registration successful! Redirecting to login page...
            </div>
          )}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-full"
              required
            />

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-full"
                required
              />
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-full"
                required
              />
              {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-full"
                required
              />
              {formErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
