import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axiosInstance';

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
};

export const login = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
    try {
        const res = await API.post('/auth/login', payload);
        return res.data;
    } catch (err) {
        // ✅ FIXED: Proper error handling
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
    }
});

export const register = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
    try {
        const res = await API.post('/auth/register', payload);
        return res.data;
    } catch (err) {
        // ✅ FIXED: Proper error handling for register
        console.log('Register error in thunk:', err.response?.data);
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Registration failed");
    }
});

export const fetchMe = createAsyncThunk('auth/me', async (_, thunkAPI) => {
    try {
        const res = await API.get('/auth/me');
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch user");
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers(builder) {
        builder
            // Register cases
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log('Register rejected with error:', action.payload);
            })
            // Login cases
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // FetchMe cases
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(fetchMe.rejected, (state) => {
                state.user = null;
                state.token = null;
                localStorage.removeItem('token');
            });
    }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;