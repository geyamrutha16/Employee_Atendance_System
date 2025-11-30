import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axiosInstance';

export const checkIn = createAsyncThunk('attendance/checkIn', async () => {
    const res = await API.post('/attendance/checkin');
    return res.data;
});
export const checkOut = createAsyncThunk('attendance/checkOut', async () => {
    const res = await API.post('/attendance/checkout');
    return res.data;
});
export const fetchHistory = createAsyncThunk('attendance/fetchHistory', async () => {
    const res = await API.get('/attendance/my-history');
    return res.data;
});
export const fetchSummary = createAsyncThunk('attendance/fetchSummary', async (month) => {
    const res = await API.get('/attendance/my-summary' + (month ? `?month=${month}` : ''));
    return res.data;
});

const slice = createSlice({
    name: 'attendance',
    initialState: { records: [], summary: {}, todayStatus: null },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchHistory.fulfilled, (state, action) => { state.records = action.payload; });
        builder.addCase(fetchSummary.fulfilled, (state, action) => { state.summary = action.payload; });
    }
});

export default slice.reducer;
