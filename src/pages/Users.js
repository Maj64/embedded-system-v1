import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../store/features/postSlice";
import { Container } from "react-bootstrap";
import { TableComponent } from "../components";

const Devices = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const status = useSelector((state) => state.posts.status);
    const error = useSelector((state) => state.posts.error);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    const itemsPerPage = 5;

    return (
        <div className="device-container">
            <Container>
                <TableComponent data={posts} itemsPerPage={itemsPerPage} title={"Users"} />
            </Container>
        </div>
    );
};

export default Devices;
