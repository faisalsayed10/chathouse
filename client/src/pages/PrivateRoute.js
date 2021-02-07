import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../schema/queries";
import { UserContext } from "../context/context";
import Loading from "../components/Loading";

function PrivateRoute({ children, ...rest }) {
  const { data, loading } = useQuery(GET_USER);
  const { setUser } = useContext(UserContext)

  if (loading) return <Loading />;
  if (!data?.me?.id) {
    return <Redirect to="/login" />;
  } else {
    setUser(data?.me)
  }

  return <Route {...rest} render={() => children} />;
}

export default PrivateRoute;
