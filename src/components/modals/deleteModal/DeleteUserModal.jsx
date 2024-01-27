import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { toggleDeleteUserModal } from "../../../features/modals/modalsSlice";
import { deleteUser } from "../../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";

const DeleteUserModal = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.modals.deleteUser);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await dispatch(deleteUser(userId));
            await dispatch(toggleDeleteUserModal());
            await navigate('/');
        } catch (error) {
            console.error('Error removing user:', error);
        }
    };

    const cancelDelete = () => {
        dispatch(toggleDeleteUserModal());
    };

    return (
        <Dialog
            open={true}
            onClose={cancelDelete}
            aria-labelledby="delete-user-dialog-title"
            aria-describedby="delete-user-dialog-description"
        >
            <DialogTitle id="delete-user-dialog-title">Remove User</DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-user-dialog-description">
                    Are you sure you want to permanently delete this user?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
                <Button onClick={cancelDelete} variant="contained">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteUserModal;
