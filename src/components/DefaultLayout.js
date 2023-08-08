// components/Layout.js

import { useState } from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import Sidebar from "./Sidebar";
import NavbarCustom from "./Navbar";

import "../styles/DefaultLayout.scss";

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Container fluid className="layout-container">
            <Row>
                <Col md={sidebarOpen ? 1 : 2} className={`bg-dark sidebar ${sidebarOpen ? "collapsed" : ""}`}>
                    <Sidebar open={sidebarOpen} />
                </Col>
                <Col md={sidebarOpen ? 11 : 10} className="content">
                    <NavbarCustom toggleSidebar={toggleSidebar} />
                    <div className="p-2">{children}</div>
                </Col>
            </Row>
        </Container>
    );
};

export default Layout;
