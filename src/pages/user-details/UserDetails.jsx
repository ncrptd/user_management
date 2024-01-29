import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Paper, Grid, Box, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { toggleDeleteUserModal, toggleResetPasswordModal } from '../../features/modals/modalsSlice';
import { disableUser, enableUser } from '../../features/users/usersSlice';
import { getLoggedUser } from '../../utils/getLoggedUser';
import ManageRoles from '../../components/manageRoles/ManageRoles';
import { useTheme } from '@emotion/react';
import { CheckCircleOutline as CheckCircleOutlineIcon, HighlightOff as HighlightOffIcon } from '@mui/icons-material';

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
        <Paper elevation={3} sx={{ padding: 3, margin: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                User Details
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><strong>Name:</strong></TableCell>
                                    <TableCell>{user.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Email:</strong></TableCell>
                                    <TableCell>{user.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Organization:</strong></TableCell>
                                    <TableCell>{user.organization}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Role:</strong></TableCell>
                                    <TableCell>{user.role}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Status:</strong></TableCell>
                                    <TableCell>{user.isDisabled ? 'Disabled' : 'Active'}</TableCell>
                                </TableRow>
                                {(loggedUser.role === 'ROOT_ADMIN' || loggedUser.role === 'TENANT_ADMIN') && (
                                    <TableRow>
                                        <TableCell><strong>Manage Roles:</strong></TableCell>
                                        <TableCell>
                                            <ManageRoles userId={user.id} />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                        {user.isDisabled ?
                            <Button variant='contained' onClick={() => onEnable(user.id)} startIcon={<CheckCircleOutlineIcon />} sx={{
                                marginRight: 2, backgroundColor: theme.palette.primary.brand, '&:hover': {
                                    background: theme.palette.secondary.brand
                                }
                            }}>
                                Enable User
                            </Button>
                            :
                            <Button variant='contained' onClick={() => onDisable(user.id)} startIcon={<HighlightOffIcon />} sx={{
                                marginRight: 2, backgroundColor: theme.palette.primary.brand, '&:hover': {
                                    background: theme.palette.secondary.brand
                                }
                            }}>
                                Disable User
                            </Button>
                        }
                        <Button variant="outlined" color="error" onClick={() => onRemove(user.id)} sx={{ marginRight: 2, }}>
                            Delete User
                        </Button>
                        <Button variant="outlined" onClick={() => onPasswordReset(user.id)}>
                            Reset Password
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserDetails;
