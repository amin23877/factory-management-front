import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import sessionSlice from "../features/Session/sessionsSlice";

export const store = configureStore({
    reducer: {
        session: sessionSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
