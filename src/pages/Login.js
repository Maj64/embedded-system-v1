import { useEffect, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useHistory, Redirect, Link } from "react-router-dom";
import { loginUser, registerUser, refreshAccessToken } from "../store/features/authSlice";
import { useSelector, useDispatch } from "react-redux";

// In your component
// dispatch(loginUser({ username: "user1", password: "password" }));
// dispatch(registerUser({ username: 'user12', password: 'password', email: 'user12@plantmon.com' }));
// dispatch(refreshAccessToken({ username: 'user12', password: 'password', email: 'user12@plantmon.com' }));

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const isLogin = localStorage.getItem("isLogin");
        if (isLogin) {
            history.push("/");
        }
    }, []);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData))
            .unwrap()
            .then((originalPromiseResult) => {
                // handle result here
                const { access: accessToken } = originalPromiseResult;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("isLogin", true);
                history.push("/");
            })
            .catch((rejectedValueOrSerializedError) => {
                // handle error here
                console.log(rejectedValueOrSerializedError);
            });
    };

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
                                    <p className=" mb-5">Please enter your username and password!</p>
                                    <div className="mb-3">
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">Username</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Username"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                />
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
