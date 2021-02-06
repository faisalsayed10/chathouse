import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../query/queries";
import { UserContext } from "../context/context";

function PrivateRoute({ children, ...rest }) {
  // const { setUser } = useContext(UserContext)
  const { data, loading } = useQuery(GET_USER);

  if (loading) return "loading...";
  if (!data.me?.id) return <Redirect to="/login" />;
  // if (data?.me) setUser(data.me)

  return <Route {...rest} render={()=>children} />;
}

export default PrivateRoute;
