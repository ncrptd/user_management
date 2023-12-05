import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    status: 'idle',
    error: null,
};

export const createUser = createAsyncThunk('user/create', async (userDetails, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:3000/api/v1/user', userDetails);
        console.log('response user', response)
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state) => {
                console.log('success user create', state)
                state.status = 'success';
            })
            .addCase(createUser.rejected, (state, action) => {

                state.status = 'error';
                state.error = action.payload || 'Failed to create user';
                console.log('failed user create', state)

            });
    },
});

export default usersSlice.reducer;
