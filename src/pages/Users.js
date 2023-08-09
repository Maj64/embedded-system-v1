import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { ProfileComponent } from "../components";
import { fetchUser } from "../store/features/userSlice";

const Devices = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.user.user);

    const accessToken = token.access || localStorage.getItem("accessToken");

    useEffect(() => {
        dispatch(fetchUser(accessToken));
    }, [accessToken, dispatch]);

    return (
        <div className="device-container">
            <Container>{userData && <ProfileComponent userData={userData} />}</Container>
        </div>
    );
};

export default Devices;
