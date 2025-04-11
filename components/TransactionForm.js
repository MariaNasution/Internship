import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addTransaction, 
  editTransaction, 
  clearCurrentTransaction 
} from '../store/transactionSlice';

const TransactionForm = ({ onSave }) => {
  const dispatch = useDispatch();
  const { currentTransaction } = useSelector((state) => state.transactions);
  const { user } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (currentTransaction) {
      setFormData({
        title: currentTransaction.title,
        price: currentTransaction.price,
        date: currentTransaction.date,
      });
    }
  }, [currentTransaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const transactionData = {
      ...formData,
      userId: user.id,
    };
    
    if (currentTransaction) {
      dispatch(editTransaction({ 
        id: currentTransaction.id, 
        data: transactionData 
      }));
    } else {
      dispatch(addTransaction(transactionData));
    }
    
    setFormData({
      title: '',
      price: '',
      date: new Date().toISOString().split('T')[0],
    });
    
    dispatch(clearCurrentTransaction());
    if (onSave) onSave();
  };

  const handleCancel = () => {
    dispatch(clearCurrentTransaction());
    setFormData({
      title: '',
      price: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">
        {currentTransaction ? 'Edit Transaction' : 'Add New Transaction'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            className="w-full p-2 border rounded"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            type="number"
            name="price"
            step="0.01"
            className="w-full p-2 border rounded"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            name="date"
            className="w-full p-2 border rounded"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex justify-end">
          {currentTransaction && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {currentTransaction ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;