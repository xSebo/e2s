import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    // console.log(auth)
    // console.log("your roles are vvv")
    // console.log(auth.roles)
    // console.log("allowed roles are vvv")
    // console.log(allowedRoles)

    let roleToken = ""
    if (auth?.user){
        const token = auth.accessToken
        roleToken = JSON.parse(window.atob(token.split(".")[1])).role;
    }
    else {roleToken = "anon"}
    // const token = auth.accessToken
    // console.log("token vvv")
    // console.log(token)
    // const roleToken = JSON.parse(window.atob(token.split(".")[1])).role;
    // console.log("roletoken")
    // console.log(roleToken.toString())


    return (


        // auth?.roles?.find(role => allowedRoles?.includes(role))
        auth.roles == allowedRoles
        // allowedRoles?.equals(auth?.roles)
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );

    // return (
    //
    //     auth?.user
    //         ? roleToken === allowedRoles
    //             ? <Outlet />
    //             : <Navigate to="/unauthorized" state={{ from: location }} replace />
    //         : <Navigate to="/login" state={{ from: location }} replace />
    //
    // );

    // return (
    //
    //      auth?.user
    //         ? <Outlet/>
    //          : <Navigate to="/login" state={{from: location}} replace/>
    // );
}

export default RequireAuth;