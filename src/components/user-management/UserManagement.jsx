import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@emotion/react';

import { useNavigate } from 'react-router-dom';

const UserManagement = ({ users }) => {
    const navigate = useNavigate();

    const onManage = (id) => {
        navigate(`/user-details/${id}`);
    };

    const theme = useTheme();


    return (
        <div style={{ marginTop: '20px' }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Organization</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Roles</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((user) => (
                            <TableRow key={user.id} >
                                <TableCell>{user.organization}</TableCell>
                                <TableCell> <span style={{ color: user.isDisabled ? 'red' : 'inherit' }}>
                                    {user.email}
                                </span></TableCell>
                                <TableCell className='role'>{user.role}</TableCell>
                                <TableCell className="actions">
                                    <Button onClick={() => onManage(user?.id)} variant="contained" color="primary" sx={{
                                        backgroundColor: theme.palette.primary.brand, '&:hover': {
                                            background: theme.palette.secondary.brand
                                        }
                                    }}>
                                        Manage
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
};

export default UserManagement;
