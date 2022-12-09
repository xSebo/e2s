import Login from './routes/User/Login';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import {Routes, Route} from 'react-router-dom';
import ErrorPage from "./routes/User/ErrorPage";
import Dashboard from "./routes/User/Dashboard";
import Export from "./fragments/user/Export";
import "./static/css/App.css"
import CreateOrganisation from "./routes/Admin/CreateOrganisation";
import Advice from "./fragments/user/Advice";
import Costs from "./routes/User/Costs";
import EnergyImported from "./fragments/user/EnergyImported";
import EnergyExported from "./fragments/user/EnergyExported";
import EnergyFlow from "./fragments/user/EnergyFlow";
import CO2Emissions from "./fragments/user/CO2Emissions";
import ListOrganisations from "./routes/Admin/ListOrganisations";
import ListUsers from "./routes/Admin/ListUsers";

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
                    <Route element={<RequireAuth allowedRoles={ROLES.Admin}/>}>
                        <Route path="createOrganisation" element={<CreateOrganisation />}/>
                        <Route path="listOrganisations" element={<ListOrganisations />} />
                        <Route path="listUsers" element={<ListUsers />}/>
                    </Route>

                    {/* Error Pages */}
                    <Route path="error" element={<ErrorPage errorTitle="Error!" errorMessage="Sorry we've encountered and error on our end :(" />} />
                    <Route path="*" element={<ErrorPage errorTitle="Page Not Found!" errorMessage="Sorry, we couldn't find the page you're looking for." />} />
                    <Route path="unauthorised" element={<ErrorPage errorTitle="Unauthorised!" errorMessage="You're no authorised to view this page, please sign in first." />} />
                    <Route path="forbidden" element={<ErrorPage errorTitle="Unauthorised!" errorMessage="You're no authorised to view this page." />} />
                    <Route path="request-timeout" element={<ErrorPage errorTitle="Request Timed Out!" errorMessage="Sorry, the request timed out, please try again" />} />
                    <Route path="teapot" element={<ErrorPage errorTitle="I'm a Teapot!" errorMessage="Not sorry, you cannot brew coffee in a teapot." />} />

                </Route>
            </Routes>
        </div>
    );
}

export default App;