import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Modal, Box } from '@mui/material';
import { createUser } from '../../../features/users/usersSlice';
import { useTheme } from '@emotion/react';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';



const roles = ['USER', 'TENANT', 'TENANT_ADMIN'];

const RootAdminCreateUserForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        organization: '',
        password: '',
        confirmPassword: '',
        role: roles[0],
    });

    const [passwordError, setPasswordError] = useState(false);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordError(true);
        } else {
            dispatch(createUser(formData));
            handleClose();
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                    sx={{
                        backgroundColor: theme.palette.primary.brand,
                        '&:hover': {
                            backgroundColor: theme.palette.secondary.brand,
                        },
                    }}
                >
                    Create User
                    <PersonAddAlt1Icon sx={{ marginLeft: '10px' }} />
                </Button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="create-user-modal-title"
                aria-describedby="create-user-modal-description"
            >
                <Box style={{
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', maxWidth: '400px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px'
                }}>
                    <h2 id="create-user-modal-title" style={{ textAlign: 'center', marginBottom: '20px' }}>Create User</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Organization"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            error={passwordError}
                            helperText={passwordError && "Password Does Not Match"}
                            fullWidth
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Role</InputLabel>
                            <Select name="role" value={formData.role} onChange={handleChange}>
                                {roles.map((role) => (
                                    <MenuItem key={role} value={role}>
                                        {role}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{
                            backgroundColor: theme.palette.primary.brand,
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.brand,
                            },
                        }}>Create</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default RootAdminCreateUserForm;
