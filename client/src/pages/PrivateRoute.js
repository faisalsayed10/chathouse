import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Redirect, Route } from "react-router-dom";
// import { UserContext } from "../context/context";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        return Cookies.get("access-token") ? (
          children
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}

export default PrivateRoute;
