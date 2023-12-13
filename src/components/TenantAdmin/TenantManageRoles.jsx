import { useState } from "react";


function TenantManageRoles() {
    const [selectedRole, setSelectedRole] = useState('USER');
    const onManageRoles = () => {
        // Handle role change logic, e.g., dispatch an action to update the user's role
        console.log('Selected Role:', selectedRole);
    }
    return (
        <div>
            <label htmlFor="roles">Manage Role:</label>
            <select
                id="roles"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
            >
                <option value="USER">USER</option>
                <option value="TENANT_ADMIN">TENANT_ADMIN</option>
            </select>
            <button onClick={onManageRoles}>Save Role</button>
        </div>
    )
}

export default TenantManageRoles