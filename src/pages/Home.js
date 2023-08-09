import React, { useEffect, useState } from "react";
import { ChartComponent } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { fetchInfoDevice } from "../store/features/infoDeviceSlice";

import "../styles/Home.scss";

const Home = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const accessToken = token?.access || localStorage.getItem("accessToken");

    const [result, setResult] = useState({});

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log(`Current blinking text:`);
            dispatch(fetchInfoDevice(accessToken)).then((result) => {
                setResult(result.payload);
            });
        }, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, [accessToken, dispatch]);

    return (
        <div className="home-container" style={{ position: "relative", margin: "auto", width: "80vw" }}>
            {result && <ChartComponent infoDevice={result} />}
        </div>
    );
};

export default Home;
