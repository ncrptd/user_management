import { useState } from "react";
import { getLoggedUser } from "../../utils/getLoggedUser";
import { useDispatch } from "react-redux";
import { manageRoles } from "../../features/users/usersSlice";


function RootManageRoles({ userId }) {
    const [selectedRole, setSelectedRole] = useState('USER');
    const loggedInUser = getLoggedUser();

    const dispatch = useDispatch();

    const onManageRoles = () => {
        // Handle role change logic, e.g., dispatch an action to update the user's role
        console.log('Selected Role:', selectedRole);
        dispatch(manageRoles({ userId, newRole: selectedRole }))

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
                {loggedInUser.role === 'ROOT_ADMIN' && <option value="TENANT">TENANT</option>}
                <option value="TENANT_ADMIN">TENANT_ADMIN</option>
            </select>
            <button onClick={onManageRoles}>Save Role</button>
        </div>
    )
}

export default RootManageRoles