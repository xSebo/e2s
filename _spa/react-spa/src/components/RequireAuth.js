import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    function getCookie(name)
    {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    }

    let logToken = getCookie("jwTtoken");
    const loggedIn = (logToken != null)
    let logRoles = '';

    if (loggedIn){
        logRoles = JSON.parse(window.atob(logToken.split(".")[1])).role;
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