import "../../static/css/dashboard.css"
import AdminNavbar from "../../components/navbar/AdminNavbar";

const AdminDashboard = ({fragment}) => {

    let Fragment = fragment || null;
    if (fragment == null) {
        Fragment = () => { return <h1 /> }
    }

    return (
        <div className={"page-container"}>
            <AdminNavbar />
            <div className={"fragment-container"}>
                <Fragment />
            </div>
        </div>
    )
}

export default AdminDashboard