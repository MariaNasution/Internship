import { useState, useEffect } from 'react';
import { DollarSign, PieChart, TrendingUp, Shield, BarChart2, CreditCard, Settings, Compass } from 'lucide-react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to handle scroll position for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navigation Bar */}
      <nav className={`w-full py-4 transition-all duration-300 z-50 ${
        isScrolled ? 'fixed top-0 bg-white shadow-md' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500" />
              <span className="ml-2 text-2xl font-bold text-gray-800">GoFinance</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-500 font-medium">
                Features
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-500 font-medium">
                Testimonials
              </a>
            </div>
            <div>
              <a href="/login" className="px-4 py-2 text-gray-600 hover:text-blue-500 font-medium">
                Login
              </a>
              <a href="/register" className="px-6 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-blue-500 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white-800 mb-6">GoFinance</h1>
          <p className="text-xl text-white-600 mb-10 max-w-2xl mx-auto">
            Smart financial tracking for a better tomorrow. Take control of your finances and build wealth with our intuitive tools.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <a href="/register" className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium text-lg hover:bg-blue-600 transition-colors shadow-lg">
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Powerful Features to Transform Your Finances</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Expense Tracking</h3>
              <p className="text-gray-600">Monitor your spending habits and identify areas for savings with intuitive visualizations.</p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Budgeting Tools</h3>
              <p className="text-gray-600">Create personalized budgets and reach your financial goals faster with smart allocation.</p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Secure Platform</h3>
              <p className="text-gray-600">Your financial data is encrypted and protected at all times with bank-level security measures.</p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Investment Tracking</h3>
              <p className="text-gray-600">Monitor and analyze your investments to optimize your portfolio performance.</p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Bill Management</h3>
              <p className="text-gray-600">Never miss a payment with automated bill tracking and payment reminders.</p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Custom Reports</h3>
              <p className="text-gray-600">Generate detailed financial reports tailored to your specific needs and goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-4xl font-bold text-blue-500 mb-2">500k+</h3>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-blue-500 mb-2">$180M+</h3>
              <p className="text-gray-600">Savings Generated</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-blue-500 mb-2">98%</h3>
              <p className="text-gray-600">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="italic text-gray-600 mb-6">
                "GoFinance transformed how I manage money. I've saved more in 3 months than I did all last year! The visual breakdowns make it so easy to see where my money is going."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium text-gray-800">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Small Business Owner</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="italic text-gray-600 mb-6">
                "As someone who always struggled with budgeting, GoFinance has been a game-changer. The app is intuitive and the notifications keep me accountable."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium text-gray-800">Michael Chen</p>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="italic text-gray-600 mb-6">
                "I've tried at least five different finance apps, and GoFinance is by far the most comprehensive and user-friendly. The investment tracking feature is exceptional."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium text-gray-800">Jessica Williams</p>
                  <p className="text-sm text-gray-500">Financial Analyst</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of users who have transformed their financial future with GoFinance.
          </p>
          <a href="/signup" className="px-8 py-3 bg-white text-blue-600 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors shadow-lg">
            Start Your Free Trial
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <DollarSign className="h-8 w-8 text-green-400" />
                <span className="ml-2 text-2xl font-bold text-white">GoFinance</span>
              </div>
              <p className="mb-6">
                Smart financial tracking for a better tomorrow. Take control of your finances.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>Features</li>
                <li>Testimonial</li>
                <li>FAQ</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>Blog</li>
                <li>Financial Guides</li>
                <li>Calculators</li>
                <li>Support Center</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-700 text-center">
            <p>© {new Date().getFullYear()} GoFinance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 