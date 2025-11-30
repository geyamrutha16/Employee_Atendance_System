import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axiosInstance";

export const checkIn = createAsyncThunk(
    "attendance/checkIn",
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.post("/attendance/checkin");
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err.message || "Check-in failed"
            );
        }
    }
);

export const checkOut = createAsyncThunk(
    "attendance/checkOut",
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.post("/attendance/checkout");
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err?.response?.data?.message || err.message || "Check-out failed"
            );
        }
    }
);

export const fetchHistory = createAsyncThunk(
    "attendance/fetchHistory",
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get("/attendance/my-history");
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed");
        }
    }
);

export const fetchSummary = createAsyncThunk(
    "attendance/fetchSummary",
    async (month, { rejectWithValue }) => {
        try {
            const res = await API.get(
                `/attendance/my-summary${month ? `?month=${month}` : ""}`
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed");
        }
    }
);

const slice = createSlice({
    name: "attendance",
    initialState: {
        records: [],
        summary: {},
        error: null,
    },
    reducers: {},
    extraReducers(builder) {
        builder

            // CHECK IN
            .addCase(checkIn.rejected, (state, action) => {
                state.error = action.payload;
            })

            // CHECK OUT
            .addCase(checkOut.rejected, (state, action) => {
                state.error = action.payload;
            })

            // HISTORY
            .addCase(fetchHistory.fulfilled, (state, action) => {
                state.records = action.payload;
            })

            // SUMMARY
            .addCase(fetchSummary.fulfilled, (state, action) => {
                state.summary = action.payload;
            });
    },
});

export default slice.reducer;
