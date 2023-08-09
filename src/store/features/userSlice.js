import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpRequest from "../../utils/httpRequest";

// Define your async thunk action creator to fetch user
export const fetchUser = createAsyncThunk("user/fetchUsers", async (token) => {
    const response = await httpRequest.get("/users/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

const initialState = {
    user: null,
    status: "idle",
    error: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload; // Corrected line
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;
