import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { getLoggedUser } from '../../utils/getLoggedUser';
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';
import { Business, CloudUpload, Home, Person, Settings } from '@mui/icons-material';

const navigationItems = [
    { path: '/', label: 'Home', icon: <Home />, roles: ['ROOT_ADMIN', 'TENANT_ADMIN', 'TENANT', 'USER'] },
    { path: '/tenants', label: 'Tenants', icon: <Business />, roles: ['ROOT_ADMIN'] },
    { path: '/users', label: 'Users', icon: <Person />, roles: ['TENANT_ADMIN', 'ROOT_ADMIN'] },
    { path: '/upload', label: 'Upload', icon: <CloudUpload />, roles: ['USER'] },
    { path: '/configuration', label: 'Config', icon: <Settings />, roles: ['TENANT_ADMIN', 'ROOT_ADMIN'] },
];
function Sidebar() {
    const [state, setState] = useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const loggedInUser = getLoggedUser();

    const list = (anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >

            <List>
                {navigationItems.map(({ path, label, roles, icon }) => (
                    roles.includes(loggedInUser?.role) && (
                        <>
                            <ListItem disablePadding>
                                <NavLink to={path} className='menu-item' style={{ textDecoration: 'none', color: 'gray' }}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {icon}
                                        </ListItemIcon>

                                        <ListItemText primary={label} sx={{ color: 'black' }} />
                                    </ListItemButton>
                                </NavLink>

                            </ListItem>
                            <Divider />
                        </>
                    )
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <IconButton onClick={toggleDrawer('left', true)}>
                <MenuIcon sx={{ fontSize: '2.5rem', color: 'black' }} />
            </IconButton>
            <Drawer
                anchor="left"
                open={state.left}
                onClose={toggleDrawer('left', false)}
            >
                {list('left')}
            </Drawer>
        </div>
    );
}

export default Sidebar;