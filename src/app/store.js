import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice'
import modalsReducer from '../features/modals/modalsSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        modals: modalsReducer
    },
})

export default store