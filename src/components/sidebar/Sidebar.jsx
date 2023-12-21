import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import './Sidebar.css';
import { IconContext } from 'react-icons';
import { getLoggedUser } from '../../utils/getLoggedUser';

const navigationItems = [
    { path: '/', label: 'Home', roles: ['ROOT_ADMIN', 'TENANT_ADMIN', 'TENANT', 'USER'] },
    { path: '/tenants', label: 'Tenants', roles: ['ROOT_ADMIN'] },
    { path: '/users', label: 'Users', roles: ['TENANT_ADMIN', 'ROOT_ADMIN'] },
    { path: '/upload', label: 'Upload', roles: ['USER'] },
    { path: '/configuration', label: 'Config', roles: ['USER'] },

];

function Sidebar() {
    const [sidebar, setSidebar] = useState(false);
    const loggedInUser = getLoggedUser();

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: '#000' }}>
                <div className='sidebar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                </div>
                <div className={sidebar ? 'side-menu active' : 'side-menu'}>
                    <ul className='side-menu-items' onClick={showSidebar}>
                        <li className='sidebar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        <div className="menu-items">
                            {navigationItems.map(({ path, label, roles }) => (
                                roles.includes(loggedInUser?.role) && (
                                    <li key={path}>
                                        <NavLink to={path} className='menu-item'>
                                            {label}
                                        </NavLink>
                                    </li>
                                )
                            ))}
                        </div>
                    </ul>
                </div>
            </IconContext.Provider>
        </>
    );
}

export default Sidebar;
