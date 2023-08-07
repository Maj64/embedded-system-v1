import React from "react";
import { TableComponent } from "../components";
import { Container } from "react-bootstrap";

const Devices = () => {
    return (
        <div className="device-container">
            <Container>
                Devices Page
                <TableComponent />
            </Container>
        </div>
    );
};

export default Devices;
