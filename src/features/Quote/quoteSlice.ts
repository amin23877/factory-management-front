import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createQuote, updateQuote, deleteQuote, getQuotes, IQuote } from "../../api/quote";

export const fetchQuotes = createAsyncThunk("quote/fetchQuotes", async () => {
    return await getQuotes();
});

export const createQuoteThunk = createAsyncThunk("quote/createQuoteThunk", async (data: IQuote) => {
    return await createQuote(data);
});

export const deleteQuoteThunk = createAsyncThunk('quote/deleteQuoteThunk', async (id:number) => {
    const resp = await deleteQuote(id);
    return {...resp, id};
})

export const updateQuoteThunk = createAsyncThunk('quote/updateQuoteThunk', async (data:{id:number, data:IQuote}) => {
    const resp =  await updateQuote(data.id, data.data);
    return {id:data.id, resp};
})

interface IInitialState {
    quotes: IQuote[];
    status: "fetching quotes" | "creating quote" | "deleting quote" | "updating quote"| "success" | "idle" | "error";
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

        builder.addCase(createQuoteThunk.pending, (state, action) => {
            state.status = "creating quote";
        });
        builder.addCase(createQuoteThunk.fulfilled, (state, action) => {
            if (action.payload) {
                state.status = "success";
                state.quotes.push(action.payload);
            } else {
                state.status = "error";
            }
        });
        builder.addCase(createQuoteThunk.rejected, (state, action: any) => {
            state.status = "error";
            state.error = action.payload?.error;
        });

        builder.addCase(updateQuoteThunk.pending, (state, action) => {
            state.status = "updating quote";
        });
        builder.addCase(updateQuoteThunk.fulfilled, (state, action) => {
            if (action.payload) {
                state.status = "success";
                const index = state.quotes.findIndex(q => q.id === action.payload.id);
                state.quotes[index] = action.payload.resp;
                console.log(action.payload.resp);
            } else {
                state.status = "error";
            }
        });
        builder.addCase(updateQuoteThunk.rejected, (state, action: any) => {
            state.status = "error";
            state.error = action.payload?.error;
        });
        
        builder.addCase(deleteQuoteThunk.pending, (state, action) => {
            state.status = "deleting quote";
        });
        builder.addCase(deleteQuoteThunk.fulfilled, (state, action) => {
            if (action.payload) {
                state.status = "success";
                state.quotes = state.quotes.filter(q => q.id !== parseInt(action.payload.id));
            } else {
                state.status = "error";
            }
        });
        builder.addCase(deleteQuoteThunk.rejected, (state, action: any) => {
            state.status = "error";
            state.error = action.payload?.error;
        });
    },
});

export default quoteSlice.reducer;

export const selectQuotes = (state: any) => state.quotes.quotes;
