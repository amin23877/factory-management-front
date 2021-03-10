import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPO, IPO } from "../../api/po";

export const fetchPOs = createAsyncThunk("po/fetchPOs", async () => {
    return await getPO();
});

interface IInitialState {
    POs: IPO[];
    status: "fetching POs" | "success" | "idle" | "error";
    error?: "";
}

const initialState: IInitialState = { POs: [], status: "idle", error: "" };

const POSlice = createSlice({
    name: "POs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPOs.pending, (state, action) => {
            state.status = "fetching POs";
        });
        builder.addCase(fetchPOs.fulfilled, (state, action) => {
            if (action.payload) {
                state.status = "success";
                state.POs = action.payload;
            } else {
                state.status = "error";
            }
        });
        builder.addCase(fetchPOs.rejected, (state, action: any) => {
            state.status = "error";
            state.error = action.payload?.error;
        });
    },
});

export default POSlice.reducer;

export const selectPOs = (state: any) => state.POs.POs;
