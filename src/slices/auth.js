import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const updateUser = createAction('auth/updateUser');

export const register = createAsyncThunk(
    "auth/register",
    async ({ username, email, password }, thunkAPI) => {
        try {

            const response = await AuthService.register(username, email, password);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;

        } catch (error) {

            const message = error.message;
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        try {

            const data = await AuthService.login(email, password);
            thunkAPI.dispatch(updateUser(data.user));
            return { user: data };

        } catch (error) {

            const message = error.message;
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();

        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

const authSlice = createSlice({

    name: "auth",
    initialState,
    reducers: {},
    
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
              state.isLoggedIn = false;
            })
            .addCase(register.rejected, (state, action) => {
              state.isLoggedIn = false;
            })
            .addCase(login.fulfilled, (state, action) => {
              state.isLoggedIn = true;
              state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
              state.isLoggedIn = false;
              state.user = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
              state.isLoggedIn = false;
              state.user = null;
            })
            .addCase(updateUser, (state, action) => {
              state.user = action.payload;
              state.isLoggedIn = true;
            });
      },
});

const { reducer } = authSlice;
export default reducer;