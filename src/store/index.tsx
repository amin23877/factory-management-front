import { configureStore } from "@reduxjs/toolkit";

import sessionSlice from "../features/Session/sessionsSlice";
import quoteSlice from "../features/Quote/quoteSlice";
import activitySlice from "../features/Activity/activitySlice";
import POSlice from "../features/PO/poSlice";
import SOSlice from "../features/SO/soSlice";

export const store = configureStore({
    reducer: {
        session: sessionSlice,
        quotes: quoteSlice,
        activities: activitySlice,
        POs: POSlice,
        SOs: SOSlice,
    },
});
