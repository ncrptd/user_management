
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showCreateUserModal: false,
    showCreateTenantModal: false,
    showEditUserProfile: false,
    deleteUser: null,
    resetPasswordUser: null,
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        toggleCreateAllRoleModal: (state) => {
            state.showCreateUserModal = !state.showCreateUserModal;
        },
        toggleCreateTenantModal: (state) => {
            state.showCreateTenantModal = !state.showCreateTenantModal;
        },
        toggleEditUserProfileModal: (state) => {
            state.showEditUserProfile = !state.showEditUserProfile;
        },
        toggleDeleteUserModal: (state, action) => {
            state.deleteUser = action.payload
        },
        toggleResetPasswordModal: (state, action) => {
            state.resetPasswordUser = action.payload;
        },
    },
});

export const { toggleCreateAllRoleModal, toggleCreateTenantModal, toggleEditUserProfileModal, toggleDeleteUserModal, toggleResetPasswordModal } = modalsSlice.actions;
export default modalsSlice.reducer;
