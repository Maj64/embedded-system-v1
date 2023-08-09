import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

import { loginUser, registerUser, refreshAccessToken } from "../store/features/authSlice";
import { useSelector, useDispatch } from "react-redux";

// In your component
// dispatch(loginUser({ username: "user1", password: "password" }));
// dispatch(registerUser({ username: 'user12', password: 'password', email: 'user12@plantmon.com' }));
// dispatch(refreshAccessToken({ username: 'user12', password: 'password', email: 'user12@plantmon.com' }));

const Login = () => {
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ username: "user1", password: "password" }));
    };
    /*
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(userName)
      axios.post('http://localhost:8000/api-auth', {
        username: userName,
        password: password })
        .then (response =>{
          // access token used for requests that requires authentication
          console.log('token', response.data.access);
  
          // refresh request to get a new access token when access token expires
          console.log('refresh', response.data.refresh);
        })
        .catch((error) =>{
          console.error(error)
        });
    }
    */

    return (
        <div className="login-container">
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">Brand</h2>
                                    <p className=" mb-5">Please enter your login and password!</p>
                                    <div className="mb-3">
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">Email address</Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                <p className="small">
                                                    <Link to="/forget-password" className="text-primary">
                                                        Forgot password?
                                                    </Link>
                                                </p>
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                                    Login
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Don't have an account?{" "}
                                                <Link to="/register" className="text-primary fw-bold">
                                                    Register
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
