import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';
import modalsReducer from '../features/modals/modalsSlice';
import uploadReducer from '../features/upload/uploadSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        modals: modalsReducer,
        upload: uploadReducer
    },
})

export default store