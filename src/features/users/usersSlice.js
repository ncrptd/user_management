import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import toast from "react-hot-toast";


const initialState = {
    allUsers: null,
    status: 'idle',
    error: null,
    tenants: null,
    users: null,
};

export const createUser = createAsyncThunk('users/create', async (userDetails, { rejectWithValue }) => {
    try {
        const response = await api.createUser(userDetails);
        toast.success('Successfully Created User');
        return response.data.user;
    } catch (error) {
        toast.error('Error Creating New User')
        return rejectWithValue(error.response.data.message);
    }
});

export const getUsers = createAsyncThunk('users/get', async (param, { rejectWithValue }) => {
    try {
        const response = await api.getUsers();
        return response.data.users
    } catch (error) {
        return rejectWithValue(error.response.data)

    }
});

export const getTenants = createAsyncThunk('users/get/tenants', async (param, { rejectWithValue }) => {
    try {
        const response = await api.getTenants();
        return response.data.tenants;
    } catch (error) {
        return rejectWithValue(error.response.data)

    }
});

export const deleteUser = createAsyncThunk('users/remove', async (userId, {
    rejectWithValue
}) => {
    try {
        await api.removeUser(userId);
        toast.success('User Removed Successfully')
        return userId;
    } catch (error) {
        toast.error('Error Removing User')
        return rejectWithValue(error.response.data)
    }
})

export const passwordReset = createAsyncThunk(
    "users/reset",
    async ({ userId, newPassword }, { rejectWithValue }) => {
        try {
            await api.passwordReset(userId, newPassword);
            toast.success("Password Reset Successfully");
            return userId;
        } catch (error) {
            console.error('pass error', error)
            toast.error("Error Resetting Password");
            return rejectWithValue(error.response.data);
        }
    }
);

export const manageRoles = createAsyncThunk(
    'users/manageRoles',
    async ({ userId, newRole }, { rejectWithValue }) => {
        try {
            const response = await api.manageRoles(userId, newRole);
            toast.success('Role updated successfully');
            return response.data.user; // Assuming your API returns the updated user
        } catch (error) {
            toast.error('Error updating role');
            return rejectWithValue(error.response.data);
        }
    }
);
export const getOnlyUsers = createAsyncThunk(
    'users/getLimited',
    async (limit, { rejectWithValue }) => {
        try {
            const response = await api.getOnlyUsers(limit);
            return response.data.users;
        } catch (error) {
            return rejectWithValue(
                error.response ? error.response.data : 'Failed to fetch limited users'
            );
        }
    }
);

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //GET users
            .addCase(getUsers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.status = 'success';
                // Update state with the fetched users if needed
                state.allUsers = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload || 'Failed to fetch users';
                console.log('failed fetching users', state);
            })
            //TENANTS
            .addCase(getTenants.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getTenants.fulfilled, (state, action) => {
                state.status = 'success';
                state.tenants = action.payload;
            })
            .addCase(getTenants.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload || 'Failed to fetch tenants';
                console.log('failed fetching tenants', state);
            })
            //ADD User
            .addCase(createUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                console.log('success user create', state)
                state.status = 'success';
                state.allUsers.push(action.payload)
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload || 'Failed to create user';
                console.log('failed user create', state)

            })
            //REMOVE user
            .addCase(deleteUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.allUsers = state.allUsers.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload || 'Failed to remove user';
            })
            // RESET password
            .addCase(passwordReset.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(passwordReset.fulfilled, (state) => {
                state.status = "success";
                // Handle success if needed
            })
            .addCase(passwordReset.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload || "Failed to reset password";
            })
            // Manage roles
            .addCase(manageRoles.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(manageRoles.fulfilled, (state, action) => {
                state.status = 'success';
                state.allUsers = state.allUsers.map((user) => user.id === action.payload.id ? { ...user, role: action.payload.role } : user)

            })
            .addCase(manageRoles.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload || 'Failed to manage roles';
            })
            // GET only users
            .addCase(getOnlyUsers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getOnlyUsers.fulfilled, (state, action) => {
                state.status = 'success';
                state.users = action.payload;
            })
            .addCase(getOnlyUsers.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload || 'Failed to fetch limited users';
                console.error('Failed fetching limited users:', action.payload);
            });


    },
});

export default usersSlice.reducer;
