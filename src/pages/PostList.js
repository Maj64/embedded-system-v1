import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../store/features/postSlice";
import { PaginationTable } from "../components";
import { Container, Row } from "react-bootstrap";

const PostList = () => {
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
        <Container className="p-3">
            <Row>
                <PaginationTable data={posts} itemsPerPage={itemsPerPage} />
            </Row>
        </Container>
    );
};

export default PostList;
