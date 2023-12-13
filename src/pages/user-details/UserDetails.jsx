import './UserDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toggleDeleteUserModal, toggleResetPasswordModal } from '../../features/modals/modalsSlice';
import { getLoggedUser } from '../../utils/getLoggedUser';
import RootManageRoles from '../../components/RootAdmin/RootManageRoles';



const UserDetails = () => {
    const allUsers = useSelector(state => state.users.allUsers);

    const deleteUser = useSelector(state => state.modals.deleteUser);
    console.log('u', deleteUser)
    const { id } = useParams();
    const user = allUsers?.find((user) => user?.id === id);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // const onEditUserProfile = () => {
    //     navigate('/edit-user-profile')

    // }
    const onRemove = (userId) => {
        dispatch(toggleDeleteUserModal(userId))

    }

    const onPasswordReset = (userId) => {
        dispatch(toggleResetPasswordModal(userId))
    }

    const loggedInUser = getLoggedUser();


    useEffect(() => {
        if (!allUsers) {
            navigate('/')
        }
    }, [navigate, allUsers]);

    if (!user) {
        return <div>User not found</div>;
    }
    return (
        <div>
            <div className="user-details">
                <h2>User Details</h2>
                <div className="user-info">
                    <div>
                        <strong>Name:</strong> {user?.name}
                    </div>
                    <div>
                        <strong>Email:</strong> {user?.email}
                    </div>
                    <div>
                        <strong>Organization:</strong> {user?.organization}
                    </div>
                    <div>
                        <strong>Role:</strong> {user?.role}
                    </div>
                </div>
                <div className="user-actions">
                    {/* <button onClick={() => onDeactivate(user?.id)}>Deactivate</button> */}
                    {loggedInUser?.role === 'ROOT_ADMIN' && <RootManageRoles userId={user?.id} />}
                    {loggedInUser?.role === 'TENANT_ADMIN' && <RootManageRoles userId={user?.id} />}
                    <div>
                        <button className='remove' onClick={() => onRemove(user?.id)}>Remove</button>

                    </div>
                    <div>
                        <button onClick={() => onPasswordReset(user?.id)}>Reset Password</button>
                    </div>

                    {/* <button onClick={() => onEditUserProfile}>Edit Profile</button> */}

                </div>
            </div>
        </div>
    );
};

export default UserDetails;
