import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axiosInstance';

const initialState = { user: null, token: localStorage.getItem('token') || null, loading: false, error: null };

export const login = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
    const res = await API.post('/auth/login', payload);
    return res.data;
});
export const register = createAsyncThunk('auth/register', async (payload) => {
    const res = await API.post('/auth/register', payload);
    return res.data;
});
export const fetchMe = createAsyncThunk('auth/me', async () => {
    const res = await API.get('/auth/me');
    return res.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers(builder) {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        });
        builder.addCase(fetchMe.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
