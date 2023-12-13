// import Sidebar from '../components/sidebar/Sidebar';
import UserManagement from '../components/user-management/UserManagement';
// import { toggleCreateAllRoleModal } from '../features/modals/modalsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOnlyUsers } from '../features/users/usersSlice';



function Users() {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users.users)
    // const handleCreateUser = () => {
    //     dispatch(toggleCreateAllRoleModal())
    // }

    useEffect(() => {
        dispatch(getOnlyUsers())
    }, [dispatch])
    return (
        <div>

            <h1>User Management</h1>
            {/* <div className='create-user-btn-container'>
                <button className='create-user-btn' onClick={handleCreateUser}>Create</button>
            </div> */}
            <UserManagement users={users} param='root' />

        </div>
    )
}

export default Users