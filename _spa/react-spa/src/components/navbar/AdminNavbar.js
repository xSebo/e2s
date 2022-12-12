import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import { AdminNavbarData as NavbarData} from "./AdminNavbarData";
import "../../static/css/navbar.css";
import { FaBars } from "react-icons/fa";

function AdminNavbar() {

    function getCookie(name)
    {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    }

    const [navbarExpanded, setNavbarExpanded] = useState(true);
    const toggleExpanded = () => setNavbarExpanded(!navbarExpanded);

    const loggedIn = window.localStorage.getItem("isLoggedIn")

    let currentUserName = ""
    let currentUserEmail = ""

    if (loggedIn == "true") {
        const currentUserToken = getCookie("jwTtoken")
        currentUserName = JSON.parse(window.atob(currentUserToken.split(".")[1])).family_name;
        currentUserEmail = JSON.parse(window.atob(currentUserToken.split(".")[1])).email;
    }
    else {
        currentUserName = "John Smith"
        currentUserEmail = "JohnSmith@SmithCo.com"
    }


    const currentPath = useLocation().pathname

    const logout = ()=> {
        localStorage.removeItem('user')
        localStorage.removeItem('isLoggedIn')
        localStorage.setItem('isLoggedIn', 'false')
    }

    return (
        <div className={navbarExpanded ? "navbar nav-menu-expanded" : "navbar nav-menu-collapsed"}>
            <div className={"nav-title"}>
                {/*<h1 style={{display: navbarExpanded ? "block" : "none"}} className="nav-logo">E2S</h1>*/}
                <div>
                    <img src={"Logo_v1_EES.png"} style={{backgroundColor:"white", width:"75%"}}/>
                </div>
                <div style={{marginLeft: navbarExpanded ? "10px" : "0px"}} className="nav-expand-button">
                    {/*<FaBars onClick={toggleExpanded}/>*/}
                </div>
            </div>

            <nav className={"nav-menu"}>
                <ul className="nav-menu-items">
                    {NavbarData.map((item, index) => {
                        return (
                            <div> {
                                item.path !== "/log-out"
                                    ? item.path !== "/facilities"
                                        ?   <li key={index} className={currentPath === item.path ? item.cName + " selected" : item.cName}>
                                                <Link to={item.path}>
                                                    <div className={"icon"}> {item.icon} </div>
                                                    <span style={{display: navbarExpanded ? "block" : "none"}}>{item.title}</span>
                                                </Link>
                                            </li>
                                        :   <li key={index} className={item.cName}>
                                                <Link >
                                                    <span style={{display: navbarExpanded ? "block" : "none"}}>{item.title}</span>
                                                </Link>
                                            </li>
                                    :   <li key={index} className={currentPath === item.path ? item.cName + " selected" : item.cName}>
                                            <Link onClick={logout} to={"/login"}>
                                                <div className={"icon"}> {item.icon} </div>
                                                <span style={{display: navbarExpanded ? "block" : "none"}}>{item.title}</span>
                                            </Link>
                                        </li>
                            }
                            </div>

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

export default AdminNavbar;