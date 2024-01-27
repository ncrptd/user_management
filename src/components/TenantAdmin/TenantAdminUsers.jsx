import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, CircularProgress } from '@mui/material';
import UserManagement from '../user-management/UserManagement';
import { getUsers } from '../../features/users/usersSlice';
import TenantAdminCreateUserForm from '../modals/tenantAdminCreateUserForm/TenantAdminCreateUserForm';
function TenantAdminUsers() {
    const allUsers = useSelector((state) => state.users.allUsers);
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <Container sx={{ padding: 2 }}>
            {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
            </div> */}

            <TenantAdminCreateUserForm />

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
