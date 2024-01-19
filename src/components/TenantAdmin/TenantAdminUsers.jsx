import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography } from '@mui/material';
import UserManagement from '../user-management/UserManagement';
import { toggleCreateTenantModal } from '../../features/modals/modalsSlice';
import { getUsers } from '../../features/users/usersSlice';

function TenantAdminUsers() {
    const allUsers = useSelector((state) => state.users.allUsers);
    const dispatch = useDispatch();

    const handleCreateUser = () => {
        dispatch(toggleCreateTenantModal());
    };

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <Container>
            <div className="create-user-btn-container">
                <Button variant="contained" sx={{ backgroundColor: "green" }} onClick={handleCreateUser}>
                    Create User
                </Button>
            </div>
            {allUsers ? (
                <UserManagement users={allUsers} className="user-management-container" />
            ) : (
                <Typography variant="h6" className="loading">
                    Loading...
                </Typography>
            )}
        </Container>
    );
}

export default TenantAdminUsers;
