import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchTransaction, 
  removeTransaction 
} from '../store/transactionSlice';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const TransactionTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { transactions, loading } = useSelector((state) => state.transactions);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(removeTransaction(id));
    }
  };

  const handleEdit = (id) => {
    dispatch(fetchTransaction(id));
    onEdit(id);
  };
  
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search Transaction"
          className="w-full p-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
  
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left font-bold text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" className="mr-2" />
                Item  
              </th>
              <th scope="col" className="px-6 py-3 text-left font-bold text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left font-bold text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left font-bold text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left font-bold text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="mr-2" />
                  {transaction.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${transaction.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {transaction.date}
                </td>
                <td>

                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(transaction.id)}
                    className="group p-2 transition-all"
                  >
                    <div className="group-hover:bg-gray-200 p-2 rounded-full transition-all">
                      <FaEdit className="text-gray-600" />
                    </div>
                  </button>
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="group p-2 transition-all"
                  >
                    <div className="group-hover:bg-gray-200 p-2 rounded-full transition-all">
                      <FaTrash/>
                    </div>
                  </button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredTransactions.length === 0 && (
        <div className="text-center py-4">No transactions found</div>
      )}
    </div>
  );
};

export default TransactionTable;