import { Navigate, useLocation } from 'react-router-dom';
import { getLoggedUser } from '../utils/getLoggedUser';

function RequiresAuthentication({ children, roles }) {
    const user = getLoggedUser();
    const location = useLocation();
    // Check if user is authenticated
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // Check if the route has required roles
    const requiredRoles = roles; // Extract roles from children props
    if (requiredRoles && !requiredRoles.includes(user.role)) {
        // User doesn't have the required role
        return <Navigate to="/" />;
    }

    // User is authenticated and authorized
    return children;
}

export default RequiresAuthentication;
