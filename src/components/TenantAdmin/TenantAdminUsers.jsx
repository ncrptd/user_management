import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography, CircularProgress } from '@mui/material';
import UserManagement from '../user-management/UserManagement';
import { toggleCreateTenantModal } from '../../features/modals/modalsSlice';
import { getUsers } from '../../features/users/usersSlice';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useTheme } from '@emotion/react';
function TenantAdminUsers() {
    const allUsers = useSelector((state) => state.users.allUsers);
    const dispatch = useDispatch();

    const handleCreateUser = () => {
        dispatch(toggleCreateTenantModal());
    };

    const theme = useTheme();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <Container sx={{ padding: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateUser}
                    sx={{
                        backgroundColor: theme.palette.primary.brand,
                        '&:hover': {
                            backgroundColor: theme.palette.secondary.brand,

                        },
                    }}

                >
                    Create User
                    <PersonAddAlt1Icon sx={{ marginLeft: '10px' }} />
                </Button>
            </div>
            {allUsers ? (
                <UserManagement users={allUsers} />
            ) : (
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                    <CircularProgress />
                </Typography>
            )}
        </Container>
    );
}

export default TenantAdminUsers;
