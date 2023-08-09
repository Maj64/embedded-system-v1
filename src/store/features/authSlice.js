import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import httpRequest from "../../utils/httpRequest";

// Define your async thunk action creator for login
export const loginUser = createAsyncThunk("auth/login", async ({ username, password }) => {
    const response = await httpRequest.post(`/api-auth`, { username, password });
    return response.data;
});

// Define your async thunk action creator for registration
// export const registerUser = createAsyncThunk("auth/register", async ({ username, password, email }) => {
//     const response = await axios.post(`${baseURL}/users/register`, { username, password, email });
//     console.log(response);
//     return response.data;
// });

// Define your async thunk action creator for refreshing token
// export const refreshAccessToken = createAsyncThunk("auth/refreshToken", async ({ username, password, email }) => {
//     const response = await axios.post(`${baseURL}/api-auth/refresh/`, { username, password, email });
//     return response.data;
// });

const initialState = {
    token: null,
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload;
        });
        // .addCase(registerUser.fulfilled, (state, action) => {
        //     state.isAuthenticated = true;
        //     state.token = action.payload;
        // })
        // .addCase(refreshAccessToken.fulfilled, (state, action) => {
        //     state.token = action.payload;
        // });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
