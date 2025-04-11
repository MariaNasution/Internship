import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import { fetchTransactions } from '../../store/transactionSlice';

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { transactions } = useSelector((state) => state.transactions);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user) {
      dispatch(fetchTransactions(user.id));
    }
  }, [dispatch, isAuthenticated, router, user]);

  // Calculate summary statistics
  const totalTransactions = transactions.length;
  const totalSpent = transactions.reduce((sum, t) => sum + t.price, 0);
  const avgTransaction = totalTransactions > 0 ? totalSpent / totalTransactions : 0;

  return (
    <Layout requireAuth>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name || 'User'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Total Transactions</h3>
          <p className="text-3xl font-bold">{totalTransactions}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Total Spent</h3>
          <p className="text-3xl font-bold">${totalSpent.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Average Transaction</h3>
          <p className="text-3xl font-bold">${avgTransaction.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.slice(0, 5).map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${transaction.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {transactions.length === 0 && (
          <div className="text-center py-4">No transactions found</div>
        )}
      </div>
    </Layout>
  );
}
