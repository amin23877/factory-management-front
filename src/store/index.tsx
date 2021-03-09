import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "../features/Session/sessionsSlice";

export const store = configureStore({
    reducer: {
        session: sessionSlice,
    },
});
