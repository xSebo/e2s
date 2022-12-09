import Login from './routes/Login';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import {Routes, Route, NavLink} from 'react-router-dom';
import ErrorPage from "./routes/ErrorPage";
import Dashboard from "./routes/Dashboard";
import Advice from "./fragments/user/Advice";
import Costs from "./fragments/user/Costs";
import EnergyImported from "./fragments/user/EnergyImported";
import EnergyExported from "./fragments/user/EnergyExported";
import EnergyFlow from "./fragments/user/EnergyFlow";
import CO2Emissions from "./fragments/user/CO2Emissions";
import Export from "./fragments/user/Export";
import "./static/css/App.css"
import Unauthorised from "./routes/Unauthorised";

const ROLES = {
    'User': "User",
    'Admin': "Admin",
    'SuperAdmin': "SuperAdmin"
}

function App() {
    return (
        <div className={"background-img"}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* public routes */}
                    <Route path="login" element={<Login />} />

                    {/* we want to protect these routes */}
                    <Route element={<RequireAuth allowedRoles={ROLES.User}/>}>

                        {/* User Dashboard Routes */}
                        <Route path="/" element={<Dashboard />} />
                        <Route path="advice" element={<Dashboard fragment={Advice} />} />
                        <Route path="costs" element={<Dashboard fragment={Costs} />} />
                        <Route path="energy-imported" element={<Dashboard fragment={EnergyImported} />} />
                        <Route path="energy-exported" element={<Dashboard fragment={EnergyExported} />} />
                        <Route path="energy-flow" element={<Dashboard fragment={EnergyFlow} />} />
                        <Route path="co2-emissions" element={<Dashboard fragment={CO2Emissions} />} />
                        <Route path="export" element={<Dashboard fragment={Export} />} />
                        <Route path="log-out" element={<Dashboard />} />

                    </Route>

                    {/* Error Pages */}
                    <Route path="*" element={<ErrorPage errorTitle="404" errorMessage="Uh oh, Page Not Found!" errorDesc="Sorry, but the page you are looking for does not exist, has been removed, or is temporarily unavailable." />} />
                    <Route path="unauthorized" element={<Unauthorised errorMessage="Unauthorised!" errorDesc="You're not authorised to view this page, please sign in first." />} />
                    <Route path="error" element={<Unauthorised errorTitle="Error!" errorMessage="Sorry we've encountered an error on our end :(" errorDesc="Please try again later."/>} />
                    <Route path="forbidden" element={<Unauthorised errorMessage="Unauthorised!" errorDesc="You're not authorised to view this page." />} />
                    <Route path="request-timeout" element={<Unauthorised errorMessage="Request Timed Out!" errorDesc="Sorry, the request timed out, please try again" />} />
                    <Route path="teapot" element={<ErrorPage errorTitle="I'm a Teapot!" errorMessage="Not sorry, you cannot brew coffee in a teapot." />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;