import Login from './routes/Login';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
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
                    <Route path="*" element={<ErrorPage errorTitle="Page Not Found!" errorMessage="Sorry, we couldn't find the page you're looking for." />} />
                    <Route path="unauthorized" element={<ErrorPage errorTitle="Unauthorised!" errorMessage="You're no authorised to view this page." />} />

                </Route>
            </Routes>
        </div>
    );
}

export default App;