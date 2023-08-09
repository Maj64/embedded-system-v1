import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

const ProfileComponent = ({ userData }) => {
    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Card>
                        <Card.Header>User Information</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <strong>User ID:</strong> {userData.user_id}
                                <br />
                                <strong>Username:</strong> {userData.username}
                                <br />
                                <strong>Email:</strong> {userData.email}
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Text>
                                <strong>Devices:</strong>
                            </Card.Text>
                        </Card.Body>
                        <ListGroup variant="flush">
                            {userData.devices.map((device) => (
                                <ListGroup.Item key={device}>{device}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileComponent;
