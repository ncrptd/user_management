import { useDispatch, useSelector } from "react-redux";
import UserManagement from "../user-management/UserManagement"
import { toggleCreateTenantModal } from "../../features/modals/modalsSlice";
import { useEffect } from "react";
import { getUsers } from "../../features/users/usersSlice";


function TenantAdminUsers() {
    const allUsers = useSelector((state) => state.users.allUsers)

    const dispatch = useDispatch();

    const handleCreateUser = () => {
        dispatch(
            toggleCreateTenantModal()
        )
    }
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <div>
            <div className="create-user-btn-container">
                <button className='create-user-btn' onClick={handleCreateUser}>Create </button>
            </div>
            {allUsers ? <UserManagement users={allUsers} /> : <p className="loading">Loading...</p>}
        </div>
    )
}

export default TenantAdminUsers