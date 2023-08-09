// src/TableComponent.js
import React, { useState } from "react";
import { Table, Button, Modal, Form, Container, Row, Col, Pagination } from "react-bootstrap";

const TableComponent = ({ title, data, itemsPerPage }) => {
    const [items, setItems] = useState(data);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedData = data.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = (itemId) => {
        setItems(items.filter((item) => item.id !== itemId));
    };

    const handleShowModal = (item) => {
        setShowModal(true);
        setSelectedItem(item);
        setFormData({
            name: item.name,
            description: item.description,
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem({});
        setFormData({
            name: "",
            description: "",
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (selectedItem.id) {
            const updatedItems = items.map((item) => (item.id === selectedItem.id ? { ...item, ...formData } : item));
            setItems(updatedItems);
        } else {
            const newItem = {
                id: Math.random().toString(),
                ...formData,
            };
            setItems([...items, newItem]);
        }
        handleCloseModal();
    };

    const renderPaginationItems = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                </Pagination.Item>
            ));
        } else {
            let items = [];
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    items.push(
                        <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
                            {i}
                        </Pagination.Item>
                    );
                }
                items.push(<Pagination.Ellipsis key="ellipsis-start" />);
            } else if (currentPage >= totalPages - 2) {
                items.push(<Pagination.Ellipsis key="ellipsis-end" />);
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    items.push(
                        <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
                            {i}
                        </Pagination.Item>
                    );
                }
            } else {
                items.push(<Pagination.Ellipsis key="ellipsis-start" />);
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    items.push(
                        <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
                            {i}
                        </Pagination.Item>
                    );
                }
                items.push(<Pagination.Ellipsis key="ellipsis-end" />);
            }
            return items;
        }
    };

    return (
        <Container className="p-4">
            <Row className="align-items-center">
                <Col xs={10}>
                    <h1>Table {title}</h1>
                </Col>
                <Col xs={2}>
                    <Button variant="success" onClick={() => setShowModal(true)}>
                        Add New Item
                    </Button>
                </Col>
            </Row>
            <Row className="p-3">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr key={item.id}>
                                <td>{item.userId}</td>
                                <td>{item.title}</td>
                                <td>{item.body}</td>
                                <td>
                                    <div className="d-flex gap-1">
                                        <Button variant="primary" onClick={() => handleShowModal(item)}>
                                            Edit
                                        </Button>{" "}
                                        {/* <Button variant="warning" as={Link} to={`/edit/${item.id}`}>
                                        Edit
                                    </Button>{" "} */}
                                        <Button variant="danger" onClick={() => handleDelete(item.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                                {/* Add more table data */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
            <Row>
                <Pagination>
                    <Pagination.First onClick={() => handlePageChange(1)} />
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
                    {renderPaginationItems()}
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
                    <Pagination.Last onClick={() => handlePageChange(totalPages)} />
                </Pagination>
            </Row>

            {/* Modal for viewing details */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedItem.id ? "Edit" : "Add"} Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="description" value={formData.description} onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Button to add new item */}
        </Container>
    );
};

export default TableComponent;
