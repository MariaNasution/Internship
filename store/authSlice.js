  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
  import { loginUser, registerUser, getUserProfile } from '../lib/api';
  import { setToken, setUser, removeToken, removeUser } from '../lib/auth';
  

  export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await loginUser(email, password);
        setToken(response.token);
        setUser(response.user);
          return {
            token: response.token,
            ...response.user,
          };

        return { token: response.token, email };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const register = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
      try {
        const user = await registerUser(userData);
        return user;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const fetchUserProfile = createAsyncThunk(
    'auth/fetchUserProfile',
    async (_, thunkAPI) => {
      const res = await fetch(`/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
  
      if (!res.ok) {
        throw new Error('Gagal mengambil profil');
      }
  
      const user = await res.json();
      return user;
    }
  );
  

  const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    registrationSuccess: false
  };

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
        state.isAuthenticated = false;
        removeToken();
        removeUser();
      },
      setCurrentUser: (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      },
      resetRegistration: (state) => {
        state.registrationSuccess = false;
      },
      clearError: (state) => {
        state.error = null;
      }
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(register.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.loading = false;

          state.registrationSuccess = true;
        })
        .addCase(register.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(fetchUserProfile.fulfilled, (state, action) => {
          state.user = action.payload;
        });
    },
  });

  export const { logout, setCurrentUser, resetRegistration, clearError } = authSlice.actions;
  export default authSlice.reducer;
  
