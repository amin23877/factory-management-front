import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getMe, IEmployee, login } from "../../api/employee";
import { StorageKey } from "../../api";

export const loginThunk = createAsyncThunk("session/login", async (data: IEmployee) => {
  return await login(data);
});

export const getCurrentEmployee = createAsyncThunk("session/me", async () => {
  const token = localStorage.getItem(StorageKey);
  const user = await getMe();
  return { token, user };
});

interface IInitialState {
  session: IEmployee | null;
  token?: string | null;
  firebaseToken?: string | null;
  status: "Authorized" | "Unauthorized" | "logging in" | "login failed" | "getting current user";
  error: string;
}

const initialState: IInitialState = { session: null, status: "Unauthorized", error: "" };

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem(StorageKey);
      state.status = "Unauthorized";
      state.session = null;
      window.location.reload();
    },
    setFirebaseToken(state, action) {
      state.firebaseToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentEmployee.pending, (state) => {
      state.status = "getting current user";
    });
    builder.addCase(getCurrentEmployee.fulfilled, (state, action) => {
      if (action.payload) {
        state.status = "Authorized";
        state.session = action.payload.user;
        state.token = action.payload.token;
      } else {
        state.status = "Unauthorized";
      }
    });
    builder.addCase(getCurrentEmployee.rejected, (state, action: any) => {
      state.status = "Unauthorized";
      state.error = action.payload?.error;
    });

    builder.addCase(loginThunk.pending, (state, action) => {
      state.status = "logging in";
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.status = "Authorized";
        localStorage.setItem(StorageKey, action.payload.token);
        state.session = action.payload.employee;
      } else {
        state.status = "Unauthorized";
      }
    });
    builder.addCase(loginThunk.rejected, (state, action: any) => {
      state.status = "Unauthorized";
      state.error = action.payload?.error;
    });
  },
});

export default sessionSlice.reducer;

export const { logout, setFirebaseToken } = sessionSlice.actions;

export const selectSession = (state: any) => state.session;
export const selectSessionToken = (state: any) => state.session.token;
export const selectFirebaseToken = (state: any) => state.session.firebaseToken;

export const useSession = () => {
  const session = useSelector(selectSession);

  return session.session ? session.session : null;
};
