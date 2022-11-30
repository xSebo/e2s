import Login from './routes/Login';
import Layout from './components/Layout';
import Missing from './routes/Missing';
import Costs from './routes/Costs'
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import Unauthorized from './routes/Unauthorized';
import Dashboard from "./routes/Dashboard";


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
                <Route path="unauthorized" element={<Unauthorized />} />

                {/* we want to protect these routes */}
                <Route element={<RequireAuth allowedRoles={ROLES.User}/>}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/costs" element={<Costs />} />
                </Route>



                {/* catch all */}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;