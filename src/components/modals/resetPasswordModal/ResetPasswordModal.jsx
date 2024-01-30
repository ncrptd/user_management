import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { passwordReset } from '../../../features/users/usersSlice';
import { useTheme } from '@emotion/react';
import { TextField, Typography } from '@mui/material';

const ResetPasswordModal = ({ userId }) => {
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const theme = useTheme();


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleResetPasswordModal = () => {


        // Validate passwords
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Dispatch the password reset action
        dispatch(passwordReset({ userId, newPassword }))
            .then(() => {
                // Reset form state on success
                setNewPassword('');
                setConfirmPassword('');
                setError(null);
                handleClose();
                // Additional actions on success if needed
            }).then(() => {
                handleClose();

            })
            .catch((err) => {
                setError(err.message || 'Failed to reset password');
            });
    };


    return (
        <>
            <Button
                variant='contained'
                onClick={handleOpen}
                sx={{
                    marginRight: 2,
                    backgroundColor: theme.palette.primary.brand,
                    '&:hover': {
                        background: theme.palette.secondary.brand
                    }
                }}
            >
                Reset Password
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="reset-password-dialog-title"
                aria-describedby="reset-password-dialog-description"
            >
                <DialogTitle id="reset-password-dialog-title">Reset Password</DialogTitle>
                <DialogContent>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <TextField
                            label="New Password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            variant="outlined"
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            variant="outlined"
                        />
                        {error && <Typography style={{ color: 'red' }}>{error}</Typography>}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleResetPasswordModal} variant="contained" color="primary" sx={{
                        marginRight: 2,
                        backgroundColor: theme.palette.primary.brand,
                        '&:hover': {
                            background: theme.palette.secondary.brand
                        }
                    }}>
                        Reset Password
                    </Button>
                    <Button onClick={handleClose} variant="contained" sx={{
                        marginRight: 2,
                        backgroundColor: theme.palette.primary.brand,
                        '&:hover': {
                            background: theme.palette.secondary.brand
                        }
                    }}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ResetPasswordModal;
