import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { deleteUser } from "../../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@emotion/react';

const DeleteUserModal = ({ userId }) => {
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        try {
            dispatch(deleteUser(userId));
            handleClose();
            navigate('/');
        } catch (error) {
            console.error('Error removing user:', error);
        }
    };



    return (
        <>
            <Button
                variant='contained'
                startIcon={<PersonRemoveIcon />}
                onClick={handleOpen}
                sx={{
                    marginRight: 2,
                    backgroundColor: theme.palette.primary.brand,
                    '&:hover': {
                        background: theme.palette.secondary.brand
                    }
                }}
            >
                Delete User
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
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
                    <Button onClick={handleDelete} variant="contained" color="error">
                        Delete
                    </Button>
                    <Button onClick={handleClose} variant="contained">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteUserModal;
