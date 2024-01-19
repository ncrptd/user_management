import { Container, Typography } from '@mui/material';
import RootAdminUsers from '../../components/RootAdmin/RootAdminUsers';
import TenantAdminUsers from '../../components/TenantAdmin/TenantAdminUsers';
import { getLoggedUser } from '../../utils/getLoggedUser';

import './Home.css';

function Home() {
    const loggedInUser = getLoggedUser();

    return (
        <Container className="home">
            {loggedInUser?.role === 'ROOT_ADMIN' && <RootAdminUsers />}
            {loggedInUser?.role === 'TENANT_ADMIN' && <TenantAdminUsers />}
            <div className="regular-user">
                {(loggedInUser?.role === 'TENANT' || loggedInUser?.role === 'USER') && (
                    <Typography variant="h6">Work in Progress</Typography>
                )}
            </div>
        </Container>
    );
}

export default Home;
