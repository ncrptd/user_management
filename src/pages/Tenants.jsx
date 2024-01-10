// import Sidebar from '../components/sidebar/Sidebar';
import UserManagement from '../components/user-management/UserManagement';
import { useDispatch, useSelector } from 'react-redux';
// import { toggleCreateTenantModal } from '../features/modals/modalsSlice';
import { useEffect } from 'react';
import { getTenants } from '../features/users/usersSlice';




function Tenants() {

    const dispatch = useDispatch();

    const tenants = useSelector((state) => state.users.tenants)
    useEffect(() => {
        dispatch(getTenants())
    }, [dispatch])

    return (
        <div>

            <h1>Tenants</h1>
            {/* <div className='create-user-btn-container'>
                <button className='create-user-btn' onClick={handleCreateUser}>Create</button>
            </div> */}
            <UserManagement users={tenants} param='root' />
        </div >
    )
}

export default Tenants