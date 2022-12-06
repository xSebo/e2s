import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../../static/css/navbar.css";
import { FaBars } from "react-icons/fa";

function Navbar() {
    const [navbarExpanded, setNavbarExpanded] = useState(false);
    const toggleExpanded = () => setNavbarExpanded(!navbarExpanded);

    const currentUserName = "John Smith"
    const currentUserEmail = "JohnSmith@SmithCo.com"

    const currentPath = useLocation().pathname

    return (
        <div className={navbarExpanded ? "navbar nav-menu-expanded" : "navbar nav-menu-collapsed"}>
            <div className={"nav-title"}>
                <h1 style={{display: navbarExpanded ? "block" : "none"}} className="nav-logo">E2S</h1>
                <div style={{marginLeft: navbarExpanded ? "50px" : "0px"}} className="nav-expand-button">
                    <FaBars onClick={toggleExpanded}/>
                </div>
            </div>

            <nav className={"nav-menu"}>
                <ul className="nav-menu-items">
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={currentPath === item.path ? item.cName + " selected" : item.cName}>
                                <Link to={item.path}>
                                    <div className={"icon"}> {item.icon} </div>
                                    <span style={{display: navbarExpanded ? "block" : "none"}}>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div style={{display: navbarExpanded ? "block" : "none"}} className={"user-info"}>
                <h4>{currentUserName}</h4>
                <h4>{currentUserEmail}</h4>
            </div>
        </div>
    );
}

export default Navbar;