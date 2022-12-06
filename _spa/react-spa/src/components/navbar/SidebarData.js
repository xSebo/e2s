import React from "react";
import {
    FaRegLightbulb, FaWallet, FaDownload, FaCloud, FaArrowUp, FaArrowDown, FaChartLine, FaChartBar, FaSignOutAlt
} from "react-icons/fa";

export const SidebarData = [
    {
        title: "Facility Name",
        path: "/facilities",
        icon: <FaChartBar />,
        cName: "nav-button",
    },
    {
        title: "Advice",
        path: "/advice",
        icon: <FaRegLightbulb />,
        cName: "nav-button",
    },
    {
        title: "Costs",
        path: "/costs",
        icon: <FaWallet />,
        cName: "nav-button",
    },
    {
        title: "Energy Imported",
        path: "/energy-imported",
        icon: <FaArrowDown />,
        cName: "nav-button",
    },
    {
        title: "Energy Exported",
        path: "/energy-exported",
        icon: <FaArrowUp />,
        cName: "nav-button",
    },
    {
        title: "Energy Flow",
        path: "/energy-flow",
        icon: <FaChartLine />,
        cName: "nav-button",
    },
    {
        title: "CO2 Emissions",
        path: "/co2-emissions",
        icon: <FaCloud />,
        cName: "nav-button",
    },
    {
        title: "Export",
        path: "/export",
        icon: <FaDownload />,
        cName: "nav-button",
    },
    {
        title: "Log Out",
        path: "/log-out",
        icon: <FaSignOutAlt />,
        cName: "nav-button border-both",
    },
];