import { useDispatch } from 'react-redux';
import './Header.css';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { getLoggedUser } from '../../utils/getLoggedUser';
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInUser = getLoggedUser();


    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/')
    }
    return (
        <header className="header">
            <div className="brand">{loggedInUser?.name}</div>
            <div className="header-icon">
                <div className="user-initial">
                    {loggedInUser?.name?.slice(0, 1)}
                </div>
                <div >
                    <p className='header-role'>{loggedInUser?.role}</p>

                </div>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
