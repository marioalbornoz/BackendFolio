import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthHandler from "./AuthHandler";

export var PrivateRoute = ({ component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={(props) =>
        AuthHandler.loggedIn() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};