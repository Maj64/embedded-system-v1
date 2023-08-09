import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { fetchDevice, putDevice } from "../store/features/deviceSlice";
import httpRequest from "../utils/httpRequest";

const Devices = () => {
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);
    const accessToken = token?.access || localStorage.getItem("accessToken");
    const deviceData = useSelector((state) => state.device.device);

    const [time_interval, setTimeWater] = useState(deviceData.time_interval);

    useEffect(() => {
        dispatch(fetchDevice(accessToken));
    }, [accessToken, dispatch]);

    const handleInputChange = (e) => {
        setTimeWater(e.target.value);
    };

    const handleWateringModeChange = (event) => {
        if (event.target.value === "TIM") {
            dispatch(
                putDevice(accessToken, {
                    ...deviceData,
                    watering_mode: event.target.value,
                    time_interval,
                })
            );
        } else {
            dispatch(
                putDevice(accessToken, {
                    ...deviceData,
                    watering_mode: event.target.value,
                })
            );
        }
    };

    const handleWatering = async () => {
        await httpRequest.put(`/devices/3a4d7cdf-4b13-4616-9213-30e02b028646/manual-watering?Authorization=Bearer ${accessToken}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    };
    return (
        <div className="device-container">
            <Container>
                {deviceData && (
                    <Row className="justify-content-center mt-5">
                        <Col md={6}>
                            <Card>
                                <Card.Header>Device Information</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <strong>Device ID:</strong> {deviceData.device_id}
                                        <br />
                                        <strong>Name:</strong> {deviceData.name}
                                        <br />
                                        <strong>Owner:</strong> {deviceData.owner}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Body>
                                    <Card.Text>
                                        <strong>Watering Mode:</strong>
                                        <Form.Select aria-label="Watering Mode" value={deviceData?.watering_mode} onChange={handleWateringModeChange}>
                                            <option>Open this select menu</option>
                                            <option value="MAN">MAN</option>
                                            <option value="TIM">TIM</option>
                                            <option value="ADT">ADT</option>
                                        </Form.Select>
                                    </Card.Text>
                                </Card.Body>
                                {deviceData.watering_mode === "TIM" && (
                                    <Card.Body>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Time interval</Form.Label>
                                            <Form.Control type="text" name="text" value={time_interval} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Card.Body>
                                )}
                                <Card.Body>
                                    <Button variant="primary" type="submit" onClick={handleWatering}>
                                        Water
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default Devices;
