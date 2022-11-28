import Login from './components/Login';
import Dashboard from "./routes/Dashboard";
import Layout from './components/Layout';
import Missing from './components/Missing';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import Unauthorized from './components/Unauthorized';


const ROLES = {
    'User': 2001,
    'Editor': 1984,
    'Admin': 5150
}

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route path="login" element={<Login />} />
                <Route path="unauthorized" element={<Unauthorized />} />

                {/* we want to protect these routes */}
                <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                    <Route path="/" element={<Dashboard />} />
                </Route>



                {/* catch all */}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;