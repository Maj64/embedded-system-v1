// // src/App.js
// import React, { useState } from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { Navbar, Nav } from "react-bootstrap";
// // import Login from "./Login";
// import Dashboard from "./Dashboard";
// import NotFound from "./NotFound";
// import PrivateRoute from "./PrivateRoute";

// const App = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     return (
//         <Router>
//             <Navbar bg="light" expand="lg">
//                 <Navbar.Brand href="/">Bootstrap React Private Route</Navbar.Brand>
//                 <Nav className="ml-auto">{isLoggedIn ? <Nav.Link href="/dashboard">Dashboard</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}</Nav>
//             </Navbar>

//             <Switch>
//                 <Route exact path="/login">
//                     <Login setIsLoggedIn={setIsLoggedIn} />
//                 </Route>

//                 {/* Private route */}
//                 <PrivateRoute path="/dashboard" component={Dashboard} isLoggedIn={isLoggedIn} />

//                 <Route path="*" component={NotFound} />
//             </Switch>
//         </Router>
//     );
// };

// export default App;

// components/Sidebar.js
// import { Nav, Navbar } from "react-bootstrap";

// const Sidebar = ({ toggleSidebar }) => {
//     const handleToggleSidebar = () => {
//         toggleSidebar(!sidebarCollapsed);
//     };
//     return (
//         <Nav className="flex-column sidebar sidebar-container">
//             <Navbar className="flex-column">
//                 <Navbar.Toggle aria-controls="sidebar-content" onClick={handleToggleSidebar} />
//                 <Navbar.Collapse id="sidebar-content">
//                     <Nav className="flex-column">
//                         <Nav.Link href="#">Home</Nav.Link>
//                         <Nav.Link href="#">About</Nav.Link>
//                         <Nav.Link href="#">Services</Nav.Link>
//                         {/* Add more links as needed */}
//                     </Nav>
//                 </Navbar.Collapse>
//             </Navbar>
//             {/* Add more sidebar items */}
//         </Nav>
//     );
// };

// export default Sidebar;

import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faCog } from "@fortawesome/free-solid-svg-icons";

import "../styles/Sidebar.scss";

const Sidebar = ({ open }) => {
    return (
        <Nav className={`bg-dark sidebar-container flex-column ${open && "sidebar-container-align-center"}`}>
            <Nav.Item>
                <div className="sidebar-header p-5" style={{ color: "white" }}></div>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/dashboard" className="text-decoration-none sidebar-item">
                    <FontAwesomeIcon icon={faHome} width={20} />
                    {!open && "Dashboard"}
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/users" className="text-decoration-none sidebar-item">
                    <FontAwesomeIcon icon={faUser} width={20} />
                    {!open && "Users"}
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/devices" className="text-decoration-none sidebar-item">
                    <FontAwesomeIcon icon={faCog} width={20} />
                    {!open && "Devices"}
                </NavLink>
            </Nav.Item>
        </Nav>
    );
};

export default Sidebar;
