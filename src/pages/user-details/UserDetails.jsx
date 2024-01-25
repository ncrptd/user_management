import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Paper, Grid, Box } from '@mui/material';
import { toggleDeleteUserModal, toggleResetPasswordModal } from '../../features/modals/modalsSlice';
import { disableUser, enableUser } from '../../features/users/usersSlice';
import { getLoggedUser } from '../../utils/getLoggedUser';
import ManageRoles from '../../components/manageRoles/ManageRoles';
import { useTheme } from '@emotion/react';

const UserDetails = () => {
    const allUsers = useSelector(state => state.users.allUsers);
    const { id } = useParams();
    const user = allUsers?.find((user) => user?.id === id);
    const loggedUser = getLoggedUser();
    const theme = useTheme();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onRemove = (userId) => {
        dispatch(toggleDeleteUserModal(userId));
    };

    const onPasswordReset = (userId) => {
        dispatch(toggleResetPasswordModal(userId));
    };

    const onDisable = async (userId) => {
        dispatch(disableUser(userId));
    };

    const onEnable = async (userId) => {
        dispatch(enableUser(userId));
    };

    useEffect(() => {
        if (!allUsers) {
            navigate('/');
        }
    }, [navigate, allUsers]);

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                User Details
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ marginBottom: 2 }}>
                            <strong>Name:</strong> {user?.name}
                        </Typography>
                        <Typography sx={{ marginBottom: 2 }}>
                            <strong>Email:</strong> {user?.email}
                        </Typography>
                        <Typography sx={{ marginBottom: 2 }}>
                            <strong>Organization:</strong> {user?.organization}
                        </Typography>
                        <Typography sx={{ marginBottom: 2 }}>
                            <strong>Role:</strong> {user?.role}
                        </Typography>
                        <Typography>
                            <strong>Disabled:</strong> {user?.isDisabled ? 'True' : 'False'}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        {/* <Button variant="contained" onClick={() => (user?.isDisabled ? onEnable(user?.id) : onDisable(user?.id))} sx={{ marginBottom: 1 }}>
                            {user?.isDisabled ? 'Enable' : 'Disable'}
                        </Button> */}
                        {user?.isDisabled ? <Button variant='contained' sx={{ backgroundColor: 'green' }} onClick={() => onEnable(user?.id)}>
                            Enable
                        </Button> : <Button variant='contained' sx={{ backgroundColor: 'gray' }} onClick={() => onDisable(user?.id)}>
                            Disable
                        </Button>}
                        {loggedUser?.role === 'ROOT_ADMIN' && <ManageRoles userId={user?.id} />}
                        {loggedUser?.role === 'TENANT_ADMIN' && <ManageRoles userId={user?.id} />}

                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => onRemove(user?.id)}
                            sx={{ marginBottom: 1, marginTop: 1 }}
                        >
                            Delete User
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => onPasswordReset(user?.id)}
                            sx={{ marginBottom: 1, marginTop: 1, color: theme.palette.primary.brand }}
                        >
                            Reset Password
                        </Button>

                    </Box>
                </Grid>
            </Grid>
        </Paper >
    );
};

export default UserDetails;
