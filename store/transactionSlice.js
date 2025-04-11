import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../lib/api';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async (userId, { rejectWithValue }) => {
    try {
      return await getTransactions(userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTransaction = createAsyncThunk(
  'transactions/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      return await getTransaction(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/add',
  async (transactionData, { rejectWithValue }) => {
    try {
      return await createTransaction(transactionData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editTransaction = createAsyncThunk(
  'transactions/edit',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateTransaction(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeTransaction = createAsyncThunk(
  'transactions/remove',
  async (id, { rejectWithValue }) => {
    try {
      await deleteTransaction(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  transactions: [],
  currentTransaction: null,
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearCurrentTransaction: (state) => {
      state.currentTransaction = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.currentTransaction = action.payload;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) {
          state.transactions[index] = {
            ...state.transactions[index],
            ...action.payload,
          };
        }
      })      
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        );
      });
  },
});

export const { clearCurrentTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;