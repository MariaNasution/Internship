import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { FaUserCircle } from 'react-icons/fa'; // Ikon profil

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth); // ambil user
  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname } = router;

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const linkClass = (href) =>
    `ml-4 px-3 py-2 rounded ${
      pathname === href
        ? 'bg-blue-700 hover:bg-blue-800'
        : 'bg-blue-600 hover:bg-blue-800'
    }`;

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16 items-center">
          <Link href="/">
            <span className="text-xl font-bold cursor-pointer">GoFinance</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <span className={linkClass('/dashboard')}>Dashboard</span>
                </Link>
                <Link href="/dashboard/transactions">
                  <span className={linkClass('/dashboard/transactions')}>Transactions</span>
                </Link>
                <Link href="/dashboard/profile">
                  <span className={linkClass('/dashboard/profile')}>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-3 py-2 hover:bg-blue-800 rounded"
                >
                  Logout
                </button>
                
                {user && (
                  <div className="flex items-center space-x-2 px-3 py-1 bg-blue-700 rounded">
                    <FaUserCircle className="text-white text-xl" />
                    <div className="leading-tight text-sm">
                      <div className="font-semibold">
                        {user.fullName?.toUpperCase() || 'USER'}
                      </div>
                      <div className="text-xs">{user.role || 'Member'}</div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link href="/login">
                  <span className={linkClass('/login')}>Login</span>
                </Link>
                <Link href="/register">
                  <span className={linkClass('/register')}>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
