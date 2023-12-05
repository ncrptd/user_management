// import Sidebar from '../components/sidebar/Sidebar';
import UserManagement from '../components/user-management/UserManagement';
import { toggleCreateUserModal } from '../features/modals/modalsSlice';
import { useDispatch } from 'react-redux';

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
        role: 'user',
    },
    {
        id: 3,
        organization: 'abc',
        email: 'bob@example.com',
        role: 'user',
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
        role: 'user',
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
        role: 'user',
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
        role: 'user',
    },
    {
        id: 10,
        organization: 'lily_red',
        email: 'lily@example.com',
        role: 'user',
    },
];


function Users() {
    const dispatch = useDispatch();


    const handleCreateUser = () => {
        dispatch(toggleCreateUserModal())
    }
    return (
        <div>

            <h1>User Management</h1>
            <div className='create-user-btn-container'>
                <button className='create-user-btn' onClick={handleCreateUser}>Create User</button>
            </div>
            <UserManagement users={users} param='root' />

        </div>
    )
}

export default Users