import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import postSlice from "./features/postSlice";
import userSlice from "./features/userSlice";
import infoDeviceSlice from "./features/infoDeviceSlice";
import deviceSlice from "./features/deviceSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        posts: postSlice,
        user: userSlice,
        infoDevice: infoDeviceSlice,
        device: deviceSlice,
    },
});
