import { useDispatch, useSelector } from "react-redux";

import { toggleDeleteUserModal } from "../../../features/modals/modalsSlice";
import './DeleteUserModal.css'
import { deleteUser } from "../../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";


const DeleteUserModal = () => {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.modals.deleteUser);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await dispatch(deleteUser(userId));
            await dispatch(toggleDeleteUserModal())
            await navigate('/')
        } catch (error) {
            console.error('Error removing user:', error);
        }
    };

    const cancelDelete = () => {
        dispatch(toggleDeleteUserModal())
    };

    return (
        <div >
            <h2>Remove User</h2>
            <p>Are you sure you want to permanently delete this user?</p>
            <div className="button-container">
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
                <button className="cancel-btn" onClick={cancelDelete}>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteUserModal;
