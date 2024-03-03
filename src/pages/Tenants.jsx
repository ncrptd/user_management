// import Sidebar from '../components/sidebar/Sidebar';
import UserManagement from '../components/user-management/UserManagement';
import { useDispatch, useSelector } from 'react-redux';
// import { toggleCreateTenantModal } from '../features/modals/modalsSlice';
import { useEffect } from 'react';
import { getTenants } from '../features/users/usersSlice';
import { Container, Typography } from '@mui/material';




function Tenants() {

    const dispatch = useDispatch();

    const tenants = useSelector((state) => state.users.tenants)
    useEffect(() => {
        dispatch(getTenants())
    }, [dispatch])

    return (
        <Container sx={{ padding: '20px', }}>

            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                Tenants

            </Typography>


            <UserManagement users={tenants} />

        </Container>
    )
}

export default Tenants