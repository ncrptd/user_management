import { useDispatch } from "react-redux";
import UserManagement from "../../components/user-management/UserManagement"
import { toggleCreateTenantModal, toggleCreateUserModal } from "../../features/modals/modalsSlice";
import { getLoggedUser } from "../../utils/getLoggedUser";

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

function Home() {
    const dispatch = useDispatch();

    const loggedInUser = getLoggedUser();

    const handleCreateUser = () => {
        if (loggedInUser.role === 'tenant-admin') {
            dispatch(
                toggleCreateTenantModal()
            )

        } else if (loggedInUser?.role === 'root-admin') {
            dispatch(
                toggleCreateUserModal()
            )
        }
    }
    return (
        <div className="home">
            {loggedInUser?.role.includes('admin') && <div className='create-user-btn-container'>
                <button className='create-user-btn' onClick={handleCreateUser}>Create</button>
            </div>}

            <UserManagement users={users} param='root' />
        </div>
    )
}

export default Home