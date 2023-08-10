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
    const [watering_mode, setWateringMode] = useState(deviceData?.watering_mode);
    const [time_interval, setTimeWater] = useState(deviceData?.time_interval);

    useEffect(() => {
        setWateringMode(deviceData?.watering_mode);
        setTimeWater(deviceData?.time_interval);
      }, [deviceData]);

    useEffect(() => {
        dispatch(fetchDevice(accessToken))
    }, [accessToken, dispatch]);

    const handleInputChange = (e) => {
        setTimeWater(e.target.value);
    };

    const handleSelectChange = (e) => {
        setWateringMode(e.target.value);
    };

    const handleWateringModeChange = (event) => {
        dispatch(
            putDevice({
                ...deviceData,
                watering_mode: watering_mode,
                time_interval,
                token: accessToken,
            })
        );
        // dispatch(fetchDevice(accessToken));
    };

    const handleWatering = async () => {
        await httpRequest.put(`/devices/ffc5007b-d629-4c0f-9711-dc9aff3630c8/manual-watering`, {}, {
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
                                        <Form.Select aria-label="Watering Mode" value={watering_mode} onChange={handleSelectChange}>
                                            <option>Open this select menu</option>
                                            <option value="MAN">Manual</option>
                                            <option value="TIM">Timed</option>
                                            <option value="ADT">Auto</option>
                                        </Form.Select>
                                    </Card.Text>
                                </Card.Body>
                                {watering_mode === "TIM" && (
                                    <Card.Body>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Time interval (seconds)</Form.Label>
                                            <Form.Control type="text" name="text" value={time_interval} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Card.Body>
                                )}
                                <Card.Body>
                                    <Button variant="primary" type="submit" onClick={handleWateringModeChange}>
                                        Update Watering Mode
                                    </Button>
                                </Card.Body>
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
