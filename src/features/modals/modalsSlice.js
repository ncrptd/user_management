import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showCreateUserModal: false,
    showCreateTenantModal: false,
    showEditUserProfile: false,
    deleteUser: null,
    resetPasswordUser: null,
    isUploadModalOpen: false,
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
            state.deleteUser = action.payload;
        },
        toggleResetPasswordModal: (state, action) => {
            state.resetPasswordUser = action.payload;
        },
        toggleUploadModal: (state) => {
            state.isUploadModalOpen = !state.isUploadModalOpen;
        },
    },
});

export const {
    toggleCreateAllRoleModal,
    toggleCreateTenantModal,
    toggleEditUserProfileModal,
    toggleDeleteUserModal,
    toggleResetPasswordModal,
    toggleUploadModal,
} = modalsSlice.actions;
export default modalsSlice.reducer;
