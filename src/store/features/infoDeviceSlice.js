import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpRequest from "../../utils/httpRequest";

// Define your async thunk action creator to fetch user
export const fetchInfoDevice = createAsyncThunk("user/fetchInfoDevices", async (token) => {
    const response = await httpRequest.get("/device-readings/3a4d7cdf-4b13-4616-9213-30e02b028646", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

const initialState = {
    infoDevice: null,
};

export const infoDeviceSlice = createSlice({
    name: "infoDevice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInfoDevice.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchInfoDevice.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.infoDevice = action.payload; // Corrected line
            })
            .addCase(fetchInfoDevice.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default infoDeviceSlice.reducer;
