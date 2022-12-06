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

    const loggedIn = window.localStorage.getItem("isLoggedIn")
    let logToken;
    let logRoles = '';
    // console.log(auth)
    // console.log("your roles are vvv")
    // console.log(auth.roles)
    // console.log("allowed roles are vvv")
    // console.log(allowedRoles)

    if (loggedIn == "true"){
        logToken = getCookie("jwTtoken")
        logRoles = JSON.parse(window.atob(logToken.split(".")[1])).role;
    }
    else {}

    return (
        loggedIn === "true"
            ? logRoles == allowedRoles
                ? <Outlet />
                : loggedIn == "true"
                    ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                    : <Navigate to="/login" state={{ from: location }} replace />
            : auth.roles == allowedRoles
                ? <Outlet />
                : auth?.user
                    ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                    : <Navigate to="/login" state={{ from: location }} replace />

    );

}

export default RequireAuth;