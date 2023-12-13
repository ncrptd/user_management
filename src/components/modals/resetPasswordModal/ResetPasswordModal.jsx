
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { passwordReset } from '../../../features/users/usersSlice';
import './ResetPasswordModal.css';
import { toggleResetPasswordModal } from '../../../features/modals/modalsSlice';

const ResetPasswordModal = () => {
    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const userId = useSelector(state => state.modals.resetPasswordUser)
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
                // Additional actions on success if needed
            }).then(() => {
                dispatch(toggleResetPasswordModal())
            })
            .catch((err) => {
                setError(err.message || 'Failed to reset password');
            });
    };

    return (
        <div className="password-reset-form">
            <h2 className="form-title">Reset Password</h2>
            <div className="form-group">
                <label htmlFor="newPassword" className="form-label">
                    New Password:
                </label>
                <input
                    type="password"
                    id="newPassword"
                    className="form-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password:
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    className="form-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button className="submit-button" onClick={handleResetPasswordModal}>
                Reset Password
            </button>
        </div>
    );
};

export default ResetPasswordModal;
