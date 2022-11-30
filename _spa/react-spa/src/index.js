import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';

import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    Outlet,
    createRoutesFromElements,
} from "react-router-dom";
import Home from "./routes/Home";
import Reports from "./routes/Reports";
import Navbar from "./components/Navbar";
import "./App.css";
import Dashboard from "./routes/Dashboard";
import CreateOrganisation from "./components/CreateOrganisation";
import Login from "./components/Login";

const AppLayout = () => (
    <>
        <Navbar />
        <Outlet />
    </>
);



const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path:"/createOrganisation",
                element: <CreateOrganisation />,
            },
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "reports",
                element: <Reports />,
            },
            
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

reportWebVitals();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
