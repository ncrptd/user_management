import { useState } from 'react';
import './UserDetails.css';
import { useNavigate, useParams } from 'react-router-dom';

const user = {
    id: 2,
    organization: 'abc',
    email: 'jane@example.com',
    role: 'tenant admin',
    name: 'Jane Doe'
};

const UserDetails = ({ onDeactivate, onRemove, onManageRoles, userDetailsName }) => {
    const [selectedRole, setSelectedRole] = useState('');

    const { roleParam } = useParams();
    const navigate = useNavigate();
    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const handleManageRoles = () => {
        onManageRoles(user.id, selectedRole);
    };

    const onEditUserProfile = () => {
        navigate('/edit-user-profile')

    }
    const onResetPassword = () => {
        navigate('/reset-password')
    }
    if (!user) {
        return <div>User not found</div>;
    }
    return (
        <div>
            <div className="user-details">
                <h2>{userDetailsName} Admin User Details Management</h2>
                <div className="user-info">
                    <div>
                        <strong>Name:</strong> {user.name}
                    </div>
                    <div>
                        <strong>Email:</strong> {user.email}
                    </div>
                    <div>
                        <strong>Organization:</strong> {user.organization}
                    </div>
                    <div>
                        <strong>Role:</strong> {user.role}
                    </div>
                </div>
                <div className="user-actions">
                    <button onClick={() => onDeactivate(user.id)}>Deactivate</button>
                    <button onClick={() => onRemove(user.id)}>Remove</button>
                    <div className="manage-roles">
                        <label htmlFor="roles">Manage Roles:</label>
                        <select id="roles" value={selectedRole} onChange={handleRoleChange}>
                            <option value="">Select Role</option>
                            <option value="Tenant Admin">Tenant Admin</option>
                            <option value="Tenant">Tenant</option>
                            <option value="User">User</option>
                        </select>
                        <button onClick={handleManageRoles}>Assign Role</button>
                        {roleParam === 'tenant' && <div className='admin-actions'>
                            <button onClick={() => onResetPassword(user.id)}>Reset Password</button>
                            <button onClick={() => onEditUserProfile(user.id)}>Edit User Profile</button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
