import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import { fetchUserProfile } from '../../store/authSlice';

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!user) {
      dispatch(fetchUserProfile());
    }
    
  }, [dispatch, isAuthenticated, router, user]);

  if (loading || !user) {
    return (
      <Layout requireAuth>
        <div className="flex justify-center items-center h-64">
          <p>Loading profile...</p>
        </div>
      </Layout>
    );
  }


  return (
    <Layout requireAuth>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
            <div className="w-48 h-48 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-6xl text-blue-600">
                {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
          </div>
          <div className="md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                <p className="mt-1 text-lg">{user.fullName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                <p className="mt-1 text-lg">{user.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">User ID</h3>
                <p className="mt-1 text-lg">{user.id}</p>
              </div>
            </div>
            <div className="mt-6">
            <button
              onClick={() => router.push('edit')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Edit Profile
            </button>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}