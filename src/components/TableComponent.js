// src/TableComponent.js
import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
// import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
// import data from "./data";

const data = [
    { id: "1", name: "Item 1", description: "Description of Item 1" },
    { id: "2", name: "Item 2", description: "Description of Item 2" },
    // Add more sample data as needed
];

const TableComponent = () => {
    const [items, setItems] = useState(data);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    const handleDelete = (itemId) => {
        setItems(items.filter((item) => item.id !== itemId));
    };

    const handleShowModal = (item) => {
        setShowModal(true);
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem({});
    };

    const handleSave = (e) => {
        e.preventDefault();
        // const formData = new FormData(e.target);
        // const newItem = {
        //   id: uuidv4(),
        //   name: formData.get('name'),
        //   description: formData.get('description'),
        // };
        // setItems([...items, newItem]);
        // setShowModal(false);
    };

    return (
        <div>
            <h1>Table Component</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleShowModal(item)}>
                                    View Details
                                </Button>{" "}
                                <Button variant="warning" as={Link} to={`/edit/${item.id}`}>
                                    Edit
                                </Button>{" "}
                                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for viewing details */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Item Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <strong>Name:</strong> {selectedItem.name}
                    </p>
                    <p>
                        <strong>Description:</strong> {selectedItem.description}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Button to add new item */}
            <Button variant="success" onClick={() => setShowModal(true)}>
                Add New Item
            </Button>
        </div>
    );
};

export default TableComponent;
