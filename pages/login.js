import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const toggleMoreInfo = () => setShowMoreInfo((prev) => !prev);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: formData.email, password: formData.password }));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      {/* Left Side */}
      <div className="w-full md:w-1/2 bg-gradient-to-b from-blue-500 to-blue-900 flex flex-col justify-center items-start p-10 sm:p-16 relative overflow-hidden">
        <div className="z-10 max-w-md">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">GoFinance</h1>
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
                <ul className="space-y-2">
                  <li className="flex items-center text-white/90">
                    <div className="mr-2 text-green-300">✓</div>
                    <span>Secure and encrypted data protection</span>
                  </li>
                  <li className="flex items-center text-white/90">
                    <div className="mr-2 text-green-300">✓</div>
                    <span>Real-time financial tracking and insights</span>
                  </li>
                  <li className="flex items-center text-white/90">
                    <div className="mr-2 text-green-300">✓</div>
                    <span>Personalized investment recommendations</span>
                  </li>
                </ul>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '💸', title: 'Budget Tracking', desc: 'Set goals and track your spending' },
                  { icon: '📈', title: 'Investments', desc: 'Grow your wealth strategically' },
                  { icon: '📊', title: 'Reports', desc: 'Detailed financial reports' },
                  { icon: '👪', title: 'Family Accounts', desc: 'Manage finances together' },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex flex-col items-center"
                  >
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

          {/* Testimonial */}
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

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 p-8 px-6 sm:px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Hello Again!</h2>
            <p className="text-gray-500">Welcome Back</p>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="pl-10 mt-1 p-3 w-full border border-gray-200 rounded-2xl"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="pl-10 mt-1 p-3 w-full border border-gray-200 rounded-2xl"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-sm text-center text-gray-500">Forgot Password?</p>

          <p className="text-sm text-center">
            Don’t have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
