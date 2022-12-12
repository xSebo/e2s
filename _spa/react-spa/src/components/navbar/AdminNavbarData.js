import React from "react";
import {
    FaRegLightbulb, FaWallet, FaDownload, FaCloud, FaArrowUp, FaArrowDown, FaChartLine, FaChartBar, FaSignOutAlt
} from "react-icons/fa";

export const AdminNavbarData = [

    {
        title: "Create Organisation",
        path: "/createOrganisation",
        icon: <FaRegLightbulb />,
        cName: "nav-button",
    },
    {
        title: "List Organisations",
        path: "/listOrganisations",
        icon: <FaWallet />,
        cName: "nav-button",
    },
    {
        title: "Log Out",
        path: "/log-out",
        icon: <FaSignOutAlt />,
        cName: "nav-button border-both",
    },
];