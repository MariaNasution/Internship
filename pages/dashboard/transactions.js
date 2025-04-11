import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import TransactionTable from '../../components/TransactionTable';
import TransactionForm from '../../components/TransactionForm';
import { fetchTransactions } from '../../store/transactionSlice';


export default function Transactions() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.transactions);
  
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user) {
      dispatch(fetchTransactions(user.id));
    }
  }, [dispatch, isAuthenticated, router, user]);

  const handleEdit = () => {
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
  };

  return (
    <Layout requireAuth>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Add Transaction'}
        </button>
      </div>

      {showForm && <TransactionForm onSave={handleSave} />}

      {loading ? (
        <div className="text-center py-4">Loading transactions...</div>
      ) : (
        <TransactionTable onEdit={handleEdit} />
      )}
    </Layout>
  );
}
