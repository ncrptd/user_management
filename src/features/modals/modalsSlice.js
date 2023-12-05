
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showCreateUserModal: false,
    showCreateTenantModal: false,
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        toggleCreateUserModal: (state) => {
            state.showCreateUserModal = !state.showCreateUserModal;
        },
        toggleCreateTenantModal: (state) => {
            state.showCreateTenantModal = !state.showCreateTenantModal;
        },
    },
});

export const { toggleCreateUserModal, toggleCreateTenantModal } = modalsSlice.actions;
export default modalsSlice.reducer;
