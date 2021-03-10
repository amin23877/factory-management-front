import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQuotes, IQuote } from "../../api/quote";

export const fetchQuotes = createAsyncThunk("quote/fetchQuotes", async () => {
    return await getQuotes();
});

interface IInitialState {
    quotes: IQuote[];
    status: "fetching quotes" | "success" | "idle" | "error";
    error?: "";
}

const initialState: IInitialState = { quotes: [], status: "idle", error: "" };

const quoteSlice = createSlice({
    name: "quotes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchQuotes.pending, (state, action) => {
            state.status = "fetching quotes";
        });
        builder.addCase(fetchQuotes.fulfilled, (state, action) => {
            if (action.payload) {
                state.status = "success";
                state.quotes = action.payload;
            } else {
                state.status = "error";
            }
        });
        builder.addCase(fetchQuotes.rejected, (state, action: any) => {
            state.status = "error";
            state.error = action.payload?.error;
        });
    },
});

export default quoteSlice.reducer;

export const selectQuotes = (state: any) => state.quotes.quotes;
