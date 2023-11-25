
import React from "react";
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = sessionStorage.getItem("userData");
  // console.log("dddddddddddd", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
