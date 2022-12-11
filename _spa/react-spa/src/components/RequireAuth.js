import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ApiConnector from "../services/ApiConnector";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    const apiConnector = new ApiConnector()

    const loggedIn = apiConnector.getLoggedIn();
    let logRoles = '';

    if (loggedIn){
        logRoles = apiConnector.getUserRole();
    }

    return (
        loggedIn === true
            ? logRoles === allowedRoles
                ? <Outlet />
                : loggedIn === true
                    ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                    : <Navigate to="/login" state={{ from: location }} replace />
            : auth.roles === allowedRoles
                ? <Outlet />
                : auth?.user
                    ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                    : <Navigate to="/login" state={{ from: location }} replace />

    );

}

export default RequireAuth;