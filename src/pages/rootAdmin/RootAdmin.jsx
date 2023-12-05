import UserManagement from '../../components/user-management/UserManagement'
import { useNavigate } from 'react-router-dom';
import './RootAdmin.css'
const users = [
    {
        id: 1,
        organization: 'abc',
        email: 'john@example.com',
        role: 'user',
    },
    {
        id: 2,
        organization: 'abc',
        email: 'jane@example.com',
        role: 'tenant admin',
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
        role: 'user',
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
        role: 'user',
    },
    {
        id: 7,
        organization: 'ghi',
        email: 'david@example.com',
        role: 'admin',
    },
    {
        id: 8,
        organization: 'ghi',
        email: 'olivia@example.com',
        role: 'user',
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
        role: 'admin',
    },
];

// const data = [
//     {
//         title: 'Home',
//         path: '/root-admin'
//     },

//     {
//         title: 'Tenant Management',
//         path: '/tenants',
//     },

//     {
//         title: 'User Management',
//         path: '/users',
//     },

// ]
function RootAdmin() {
    const navigate = useNavigate();

    const handleCreateUser = () => {
        navigate('/root-admin-create-user')
    }
    return (
        <div>
            <h1>Root Admin User Management</h1>
            <div className='create-user-btn-container'>
                <button className='create-user-btn' onClick={handleCreateUser}>Create User</button>
            </div>
            <UserManagement users={users} param='root' />
        </div>
    )
}

export default RootAdmin