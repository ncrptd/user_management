import { useDispatch } from 'react-redux';
import { AppBar, Toolbar, Typography, Avatar, IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { getLoggedUser } from '../../utils/getLoggedUser';
import { useTheme } from '@emotion/react';
import logo from '../../../public/assets/logo.jpg' // Adjust the path according to your project structure

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInUser = getLoggedUser();

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/');
    };

    const theme = useTheme();
    return (
        <AppBar position="static" style={{ backgroundColor: theme.palette.primary.brand }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1, marginRight: '16px', textTransform: 'uppercase', display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
                </Typography>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton sx={{ backgroundColor: 'white' }} onClick={handleLogout}>
                        <Logout sx={{ color: 'red' }} />
                    </IconButton>
                    <Avatar style={{ backgroundColor: '#FFFFFF', color: '#2196F3', marginLeft: '8px' }}>
                        {loggedInUser?.name?.slice(0, 1)}
                    </Avatar>
                    <Typography variant="body1" style={{ color: '#FFFFFF', marginLeft: '8px' }}>
                        {loggedInUser?.role}
                    </Typography>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
