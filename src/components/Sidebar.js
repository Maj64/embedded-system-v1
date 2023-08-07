// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
// import Login from "./Login";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import PrivateRoute from "./PrivateRoute";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Bootstrap React Private Route</Navbar.Brand>
                <Nav className="ml-auto">{isLoggedIn ? <Nav.Link href="/dashboard">Dashboard</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}</Nav>
            </Navbar>

            <Switch>
                <Route exact path="/login">
                    <Login setIsLoggedIn={setIsLoggedIn} />
                </Route>

                {/* Private route */}
                <PrivateRoute path="/dashboard" component={Dashboard} isLoggedIn={isLoggedIn} />

                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    );
};

export default App;
