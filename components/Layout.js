import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import { getUser } from '../lib/auth';
import { setCurrentUser } from '../store/authSlice';

const Layout = ({ children, requireAuth = false }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = getUser();
    if (user && !isAuthenticated) {
      dispatch(setCurrentUser(user));
    } else if (requireAuth && !user) {
      router.push('/login');
    }
  }, [dispatch, isAuthenticated, requireAuth, router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;