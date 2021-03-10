import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IActivity, getActivities } from "../../api/activity";

export const fetchActivities = createAsyncThunk("activity/fetchActivities", async () => {
    return await getActivities();
});

interface IInitialState {
    activities: IActivity[];
    status: "fetching activities" | "success" | "idle" | "error";
    error?: "";
}

const initialState: IInitialState = { activities: [], status: "idle", error: "" };

const activitySlice = createSlice({
    name: "activities",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchActivities.pending, (state, action) => {
            state.status = "fetching activities";
        });
        builder.addCase(fetchActivities.fulfilled, (state, action) => {
            if (action.payload) {
                state.status = "success";
                state.activities = action.payload;
            } else {
                state.status = "error";
            }
        });
        builder.addCase(fetchActivities.rejected, (state, action: any) => {
            state.status = "error";
            state.error = action.payload?.error;
        });
    },
});

export default activitySlice.reducer;

export const selectActivities = (state: any) => state.activities.activities;
