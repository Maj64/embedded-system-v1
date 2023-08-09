// components/Navbar.js
import { NavLink, Link, useHistory } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../store/features/authSlice";
import { useDispatch } from "react-redux";

// import "../styles/Navbar.scss";

const NavbarCustom = ({ toggleSidebar }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowProfile = () => {
        history.push("/profile");
    };
    const handleLogout = () => {
        dispatch(logout());
        localStorage.clear();
        history.push("/login");
    };

    return (
        <Navbar expand="lg" className="shadow bg-light navbar-container">
            <Container>
                <Navbar.Brand className="navbar-brand-container">
                    <Link className="text-decoration-none text-dark fw-bold mx-1" to="/">
                        My App
                    </Link>
                    <Navbar.Toggle className="navbar-toggle-container" aria-controls="basic-navbar-nav" />
                </Navbar.Brand>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        {/* <NavLink className="text-decoration-none text-dark mx-1" to="/users">
                            Users
                        </NavLink>
                        <NavLink className="text-decoration-none text-dark mx-1" to="/posts">
                        Posts
                    </NavLink> */}
                        <NavLink className="text-decoration-none text-dark mx-1" to="/devices">
                            Devices
                        </NavLink>
                    </Nav>
                    <Nav>
                        <NavDropdown
                            title={
                                <span className="navbar-user-container">
                                    My Account <FontAwesomeIcon icon={faCircleUser} className="navbar-user--icon" />
                                </span>
                            }
                            id="basic-nav-dropdown"
                            align={"end"}
                        >
                            <NavDropdown.Item>
                                <Button variant="text" type="submit" onClick={handleShowProfile}>
                                    Profile
                                </Button>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Button variant="text" type="submit" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarCustom;
