import React from "react";
import { TableComponent } from "../components";
import { Container } from "react-bootstrap";

const Devices = () => {
    return (
        <div className="device-container">
            <Container>
                <TableComponent title={"Users"} />
            </Container>
        </div>
    );
};

export default Devices;
