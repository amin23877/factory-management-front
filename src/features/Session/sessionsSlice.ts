import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { IEmployee, login } from "../../api/employee";
import { StorageKey } from "../../api";

export const loginThunk = createAsyncThunk("session/login", async (data: IEmployee) => {
    return await login(data);
});

interface IInitialState {
    session: IEmployee | null;
    status: 'Authorized' | 'Unauthorized' | 'logging in' | 'login failed';
    error: string;
}

const initialState: IInitialState = { session: null, status: "Unauthorized", error: "" };

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        getCurrentSession(state) {
            const session = localStorage.getItem(StorageKey);
            if (session) {
                state.session = JSON.parse(session);
            } else {
                state.session = null;
            }
        },
        logout(state) {
            localStorage.removeItem(StorageKey);
            state.status='Unauthorized'
            state.session = null;
        },
    },
    extraReducers:builder => {
        builder.addCase(loginThunk.pending, (state, action) => {
            state.status = 'logging in'
        })
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            if(action.payload){
                state.status = 'Authorized';
                localStorage.setItem(StorageKey, JSON.stringify(action.payload));
                state.session = action.payload;
            } else {
                state.status = 'Unauthorized';
            }
        })
        builder.addCase(loginThunk.rejected, (state, action:any) => {
            state.status = 'login failed';
            state.error = action.payload.error;
        })
    }
});

export default sessionSlice.reducer;

export const { logout, getCurrentSession } = sessionSlice.actions;

export const selectSession = (state: any) => state.session;

export const useSession = () => {
    const session = useSelector(selectSession);

    return session.session ? session.session : null;
};
