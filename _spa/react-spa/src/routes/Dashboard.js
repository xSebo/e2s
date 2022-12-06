import "../static/css/dashboard.css"
import Navbar from "../components/navbar/Navbar";

const Dashboard = ({fragment}) => {

    let Fragment = fragment || null;
    if (fragment == null) {
        Fragment = () => { return <h1 /> }
    }

    return (
        <div className={"page-container"}>
            <Navbar />
            <div className={"fragment-container"}>
                <Fragment />
            </div>
        </div>
    )
}

export default Dashboard