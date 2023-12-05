/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';
import { getLoggedUser } from '../utils/getLoggedUser';

function RequiresAuth({ children }) {
    const isLoggedIn = getLoggedUser();
    const location = useLocation();
    // const navigate = useNavigate();
    // const loggedInUser = useSelector((state) => state.auth.loggedInUser);

    // if (location.pathname === '/') {
    //     console.log(location.pathname)
    //     console.log('redirect')
    //     if (loggedInUser) {
    //         navigate(`/tenant-admin`)
    //     }

    // }


    return isLoggedIn ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
}

export default RequiresAuth 