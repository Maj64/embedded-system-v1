import React, { useState } from "react";
import { Table, Pagination } from "react-bootstrap";

const PaginationTable = ({ data, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedData = data.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Body</th>
                        {/* Add more table headers */}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item, index) => (
                        <tr key={item.id}>
                            <td>{item.userId}</td>
                            <td>{item.title}</td>
                            <td>{item.body}</td>
                            {/* Add more table data */}
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                <Pagination.First onClick={() => handlePageChange(1)} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
                {renderPaginationItems()}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} />
            </Pagination>
        </div>
    );
};

export default PaginationTable;
