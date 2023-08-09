import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpRequest from "../../utils/httpRequest";

// Define your async thunk action creator to fetch InfoDevice
export const fetchDevice = createAsyncThunk("device/fetchDevice", async (token) => {
    const response = await httpRequest.get("/devices/3a4d7cdf-4b13-4616-9213-30e02b028646", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});
export const putDevice = createAsyncThunk("device/putDevice", async (data, token) => {
    const response = await httpRequest.post("/devices/3a4d7cdf-4b13-4616-9213-30e02b028646", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

const initialState = {
    device: null,
};

export const deviceSlice = createSlice({
    name: "device",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDevice.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDevice.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.infoDevice = action.payload; // Corrected line
            })
            .addCase(fetchDevice.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(putDevice.rejected, (state, action) => {
                state.status = "succeeded";
            });
    },
});

export default deviceSlice.reducer;
