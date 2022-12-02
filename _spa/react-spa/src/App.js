import Login from './routes/Login';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./routes/Dashboard";
import ErrorPage from "./routes/ErrorPage";
import Costs from "./routes/Costs";
import Export from "./routes/Export";


const ROLES = {
    'User': "User",
    'Admin': "Admin",
    'SuperAdmin': "SuperAdmin"
}

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route path="login" element={<Login />} />

                {/* we want to protect these routes */}
                <Route element={<RequireAuth allowedRoles={ROLES.User}/>}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/costs" element={<Costs />} />
                    <Route path="/export" element={<Export />} />
                </Route>

                {/* Error Pages */}
                <Route path="*" element={<ErrorPage errorTitle="Page Not Found!" errorMessage="Sorry, we couldn't find the page you're looking for." />} />
                <Route path="unauthorized" element={<ErrorPage errorTitle="Unauthorised!" errorMessage="You're no authorised to view this page." />} />

            </Route>
        </Routes>
    );
}

export default App;