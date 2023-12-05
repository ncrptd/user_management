import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
// import { SidebarData } from './SidebarData';
import './Sidebar.css';
import { IconContext } from 'react-icons';
import { getLoggedUser } from '../../utils/getLoggedUser';


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
                            <li>
                                <NavLink to='/' className='menu-item'>
                                    Home
                                </NavLink>
                            </li>
                            {loggedInUser?.role === 'root-admin' && (
                                <li>
                                    <NavLink to='/tenants' className='menu-item'>
                                        Tenants
                                    </NavLink>
                                </li>
                            )}
                            {(loggedInUser?.role === 'tenant-admin' || loggedInUser?.role === 'root-admin') && (
                                <li>
                                    <NavLink to='/users' className='menu-item'>
                                        Users
                                    </NavLink>
                                </li>
                            )}
                        </div>
                    </ul>
                </div>
            </IconContext.Provider>
        </>
    );
}

export default Sidebar;
