import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    showEditUserProfile: false,
    resetPasswordUser: null,
    isUploadModalOpen: false,
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {

        toggleEditUserProfileModal: (state) => {
            state.showEditUserProfile = !state.showEditUserProfile;
        },

        toggleUploadModal: (state) => {
            state.isUploadModalOpen = !state.isUploadModalOpen;
        },
    },
});

export const {
    toggleEditUserProfileModal,
    toggleUploadModal,
} = modalsSlice.actions;
export default modalsSlice.reducer;
