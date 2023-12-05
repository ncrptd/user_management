import UserManagement from '../../components/user-management/UserManagement'
import { useNavigate } from 'react-router-dom';
import './TenantAdmin.css'

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
        role: 'tenant',
    },
    {
        id: 3,
        organization: 'abc',
        email: 'bob@example.com',
        role: 'tenant',
    },

];

function TenantAdmin() {
    const navigate = useNavigate();

    const handleCreateUser = () => {
        navigate('/tenant-admin-create-user')
    }
    return (
        <div >
            <h1>Tenant Admin User Management</h1>
            <div className='create-user-btn-container'>
                <button className='create-user-btn' onClick={handleCreateUser}>Create User</button>
            </div>
            <UserManagement users={users} param={'tenant'} />
        </div>
    )
}

export default TenantAdmin