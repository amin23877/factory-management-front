import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSO, ISO } from "../../api/so";

export const fetchSOs = createAsyncThunk("so/fetchSOs", async () => {
    return await getSO();
});

interface IInitialState {
    SOs: ISO[];
    status: "fetching SOs" | "success" | "idle" | "error";
    error?: "";
}

const initialState: IInitialState = { SOs: [], status: "idle", error: "" };

const SOSlice = createSlice({
    name: "SOs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSOs.pending, (state, action) => {
            state.status = "fetching SOs";
        });
        builder.addCase(fetchSOs.fulfilled, (state, action) => {
            if (action.payload) {
                state.status = "success";
                state.SOs = action.payload;
            } else {
                state.status = "error";
            }
        });
        builder.addCase(fetchSOs.rejected, (state, action: any) => {
            state.status = "error";
            state.error = action.payload?.error;
        });
    },
});

export default SOSlice.reducer;

export const selectSOs = (state: any) => state.SOs.SOs;
