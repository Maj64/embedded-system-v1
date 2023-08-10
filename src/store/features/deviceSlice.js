import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpRequest from "../../utils/httpRequest";

// Define your async thunk action creator to fetch InfoDevice
export const fetchDevice = createAsyncThunk("device/fetchDevice", async (token) => {
    const response = await httpRequest.get("/devices/ffc5007b-d629-4c0f-9711-dc9aff3630c8", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});
export const putDevice = createAsyncThunk("device/putDevice", async (data) => {
    const accessToken = data.token;
    delete data.token; 
    const response = await httpRequest.put("/devices/ffc5007b-d629-4c0f-9711-dc9aff3630c8", data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
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
                state.device = action.payload; // Corrected line
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
