import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loggedInUser: null,
    isLoggedIn: false,
    status: 'idle',
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (userDetails, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/auth/login', userDetails);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : 'Failed to log in');
        }
    },
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.loggedInUser = null;
            state.isLoggedIn = false;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'success';
                state.loggedInUser = action.payload.user;
                state.isLoggedIn = true;

                if (action.payload.user) {
                    localStorage.setItem('user', JSON.stringify(action.payload));
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
