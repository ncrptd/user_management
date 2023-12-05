// import Sidebar from '../components/sidebar/Sidebar';
import UserManagement from '../components/user-management/UserManagement';
import { useDispatch } from 'react-redux';
import { toggleCreateTenantModal } from '../features/modals/modalsSlice';

const users = [
    {
        id: 1,
        organization: 'abc',
        email: 'john@example.com',
        role: 'tenant',
    },
    {
        id: 2,
        organization: 'abc',
        email: 'jane@example.com',
        role: 'tenant',
    },
    {
        id: 3,
        organization: 'abc',
        email: 'bob@example.com',
        role: 'tenant',
    },
    {
        id: 4,
        organization: 'def',
        email: 'alice@example.com',
        role: 'tenant',
    },
    {
        id: 5,
        organization: 'def',
        email: 'charlie@example.com',
        role: 'tenant',
    },
    {
        id: 6,
        organization: 'ghi',
        email: 'emma@example.com',
        role: 'tenant',
    },
    {
        id: 7,
        organization: 'ghi',
        email: 'david@example.com',
        role: 'tenant',
    },
    {
        id: 8,
        organization: 'ghi',
        email: 'olivia@example.com',
        role: 'tenant',
    },
    {
        id: 9,
        organization: 'samuel_gray',
        email: 'samuel@example.com',
        role: 'tenant',
    },
    {
        id: 10,
        organization: 'lily_red',
        email: 'lily@example.com',
        role: 'tenant',
    },
];




function Tenants() {

    const dispatch = useDispatch();


    const handleCreateUser = () => {
        dispatch(toggleCreateTenantModal())
    }

    return (
        <div>

            <h1>Tenant Management</h1>
            <div className='create-user-btn-container'>
                <button className='create-user-btn' onClick={handleCreateUser}>Create Tenant</button>
            </div>
            <UserManagement users={users} param='root' />
        </div >
    )
}

export default Tenants