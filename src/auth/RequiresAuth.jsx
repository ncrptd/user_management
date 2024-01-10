/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';
import { getLoggedUser } from '../utils/getLoggedUser';

function RequiresAuth({ children }) {
    const isLoggedIn = getLoggedUser();
    const location = useLocation();

    return isLoggedIn ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
}

export default RequiresAuth 