import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserManagement = ({ users, className }) => {
    const navigate = useNavigate();

    const onManage = (id) => {
        navigate(`/user-details/${id}`);
    };

    return (
        <div className={`${className} user-management`}>
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
                                <TableCell>{user.email}</TableCell>
                                <TableCell className='role'>{user.role}</TableCell>
                                <TableCell className="actions">
                                    <Button onClick={() => onManage(user?.id)} variant="contained" color="primary">
                                        Manage
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserManagement;
