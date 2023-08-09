// PrivateRoute.js

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./DefaultLayout";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const isLogin = localStorage.getItem("isLogin");

    return (
        <Route
            {...rest}
            render={(props) =>
                isLogin ? (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
