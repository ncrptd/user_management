import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/index";

const initialState = {
    uploadedFiles: null,
    status: "idle",
    error: null,
};


export const getUploadedFiles = createAsyncThunk(
    "upload/getUploadedFiles",
    async (param, { rejectWithValue }) => {
        try {
            const response = await api.getUploadedFiles();
            console.log('uploadedFiles', response)
            return response.data.uploadedFiles;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const uploadSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {
        updateFiles: (state, action) => {
            state.uploadedFiles.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUploadedFiles.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getUploadedFiles.fulfilled, (state, action) => {
                state.status = "success";
                // Update state with the fetched uploaded files if needed
                state.uploadedFiles = action.payload;

            })
            .addCase(getUploadedFiles.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload || "Failed to fetch uploaded files";
            });
    },
});
export const { updateFiles } = uploadSlice.actions;
export default uploadSlice.reducer;
