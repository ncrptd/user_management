import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index'
import toast from "react-hot-toast";

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
            const response = await api.login(userDetails)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data.message : 'Failed to log in');
        }
    },
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (param, { rejectWithValue }) => {
        try {
            await api.logout();
            toast.success('Successfully logged out')
            return { message: 'Successfully logged out' };
        } catch (error) {
            toast.error('Failed to Log Out')
            return rejectWithValue(error.response ? error.response.data.message : 'Failed to log out');
        }
    }
);
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // logout: (state) => {
        //     state.loggedInUser = null;
        //     state.isLoggedIn = false;
        //     state.status = 'idle';
        // },
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
                state.error = ''
                localStorage.clear('')

                if (action.payload.user) {
                    localStorage.setItem('user', JSON.stringify(action.payload));
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            })
        // Logout action
        builder.addCase(logout.pending, (state) => {
            state.status = 'loading';
        });

        builder.addCase(logout.fulfilled, (state) => {
            state.status = 'idle';
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
            localStorage.clear('user');
        });

        builder.addCase(logout.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.payload;
        });
    },
});

// export const { logout } = authSlice.actions;

export default authSlice.reducer;
