import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import { setCurrentUser } from '../../store/authSlice';
import { updateUser } from '../../lib/api';
import { setUser } from '../../lib/auth'; // <--- pastikan ini sudah ada

export default function EditProfile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user) {
      setFullName(user.fullName || '');
    }
  }, [user, isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await updateUser(user.id, { fullName });

      // Simpan hasil ke Redux
      dispatch(setCurrentUser(result));

      // Simpan juga ke localStorage
      setUser(result);

      router.push('/dashboard/profile');
    } catch (err) {
      console.error(err);
      alert('Gagal mengupdate profil: ' + err.message);
    }
  };

  return (
    <Layout requireAuth>
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </Layout>
  );
}
