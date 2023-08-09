import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://da877906-90e8-44cf-b731-dc45744a052c.mock.pstmn.io";

// Define your async thunk action creator for login
export const loginUser = createAsyncThunk("auth/login", async ({ username, password }) => {
    const response = await axios.post(`${baseURL}/api-auth`, { username, password });
    return response.data;
});

// Define your async thunk action creator for registration
export const registerUser = createAsyncThunk("auth/register", async ({ username, password, email }) => {
    const response = await axios.post(`${baseURL}/users/register`, { username, password, email });
    console.log(response);
    return response.data;
});

// Define your async thunk action creator for refreshing token
export const refreshAccessToken = createAsyncThunk("auth/refreshToken", async ({ username, password, email }) => {
    const response = await axios.post(`${baseURL}/api-auth/refresh/`, { username, password, email });
    return response.data;
});

/**
 * request
 * {
    "username": "user1",
    "password": "password"
}
 * response
 * {
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY3ODcyMDA4MywiaWF0IjoxNjc4NjMzNjgzLCJqdGkiOiJjNjRiOGI1NWE1ZjU0ZDRiYjg5YmZmMTFiNjgwNTE2NSIsInVzZXJfaWQiOiJkNTI4OTQ3My0zMDcwLTQ1ZDktOTc0My05ZDRmMDk3YmZmMmEifQ.lM0B4MXgX4ZwTrPnQJjO0ipsmO9yrMjSyzJtzA0Ph1c",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc4NjQ4MDgzLCJpYXQiOjE2Nzg2MzM2ODMsImp0aSI6IjY4ODIxOTQ2ZmQ2NjQxNDViZWVmM2ZjMTZlZjRiMmY0IiwidXNlcl9pZCI6ImQ1Mjg5NDczLTMwNzAtNDVkOS05NzQzLTlkNGYwOTdiZmYyYSJ9.ysmObdKUn6iWyqeAdO3CkLE_r1vvKq6LeUCFGQxvCEM"
}
 */

const initialState = {
    user: null,
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
