// components/Navbar.js
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleUser } from "@fortawesome/free-solid-svg-icons";

import "../styles/Navbar.scss";

const NavbarCustom = ({ toggleSidebar }) => {
    return (
        <Navbar expand="lg" className="shadow bg-light navbar-container">
            <Navbar.Collapse>
                <Button variant="text" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars} />
                </Button>
            </Navbar.Collapse>
            <Container>
                <Navbar.Brand className="navbar-brand-container">
                    <Link className="text-decoration-none text-dark fw-bold mx-1" to="/">
                        My App
                    </Link>
                    <Navbar.Toggle className="navbar-toggle-container" aria-controls="basic-navbar-nav" />
                </Navbar.Brand>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <NavLink className="text-decoration-none text-dark mx-1" to="/users">
                            Users
                        </NavLink>
                        <NavLink className="text-decoration-none text-dark mx-1" to="/devices">
                            Devices
                        </NavLink>
                        <NavLink className="text-decoration-none text-dark mx-1" to="/posts">
                            Posts
                        </NavLink>
                    </Nav>
                    <Nav>
                        <NavDropdown
                            title={
                                <span className="navbar-user-container">
                                    User 1 <FontAwesomeIcon icon={faCircleUser} className="navbar-user--icon" />
                                </span>
                            }
                            id="basic-nav-dropdown"
                            align={"end"}
                        >
                            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarCustom;
