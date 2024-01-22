// import Sidebar from '../components/sidebar/Sidebar';
import UserManagement from '../components/user-management/UserManagement';
// import { toggleCreateAllRoleModal } from '../features/modals/modalsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOnlyUsers } from '../features/users/usersSlice';
import { Container, Typography } from '@mui/material';


function Users() {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users.users)
    // const handleCreateUser = () => {
    //     dispatch(toggleCreateAllRoleModal())
    // }

    useEffect(() => {
        dispatch(getOnlyUsers())
    }, [dispatch])
    return (
        <Container sx={{ padding: '20px', }}>

            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                Users

            </Typography>


            <UserManagement users={users} param='root' />

        </Container>
    )
}

export default Users