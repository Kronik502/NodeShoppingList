import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Register User Async Action
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data; // Return the response data
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Registration failed' }); // Fallback error structure
    }
  }
);

// Login User Async Action
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      return response.data.user; // Return the user data
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Login failed' }); // Fallback error structure
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Logout action to clear user data
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Handling the registration actions
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true; // Set loading to true while waiting
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when done
        state.user = action.payload.user || null; // Set user after successful registration
        state.error = null; // Clear any existing error
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false; // Set loading to false when failed
        state.error = action.payload?.message || 'An error occurred during registration'; // Handle error safely
      })

      // Handling the login actions
      .addCase(loginUser.pending, (state) => {
        state.loading = true; // Set loading to true while waiting
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when done
        state.user = action.payload; // Set user after successful login
        state.error = null; // Clear any existing error
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false; // Set loading to false when failed
        state.error = action.payload?.message || 'An error occurred during login'; // Handle error safely
      });
  },
});

export const { logout } = authSlice.actions; // Export the logout action

export default authSlice.reducer; // Export the reducer
