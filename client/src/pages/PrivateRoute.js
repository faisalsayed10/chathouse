import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../schema/queries";
import Loading from "../components/Loading";

function PrivateRoute({ children, ...rest }) {
  const { data, loading } = useQuery(GET_USER, { fetchPolicy: 'cache-and-network'});

  console.log("logged")

  if (loading && !data) return <Loading />;
  if (!data?.me?.id) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} render={() => children} />;
}

export default PrivateRoute;
