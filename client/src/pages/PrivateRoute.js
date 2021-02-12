import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../schema/queries";
import { UserContext } from "../context/context";
import Loading from "../components/Loading";

function PrivateRoute({ children, ...rest }) {
  const { data, loading } = useQuery(GET_USER, 
    { fetchPolicy: 'cache-and-network' }
    );
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    setUser(data?.me)
    //eslint-disable-next-line
  }, [data])

  if (loading && !data?.me?.id) return <Loading />;
  if (!data?.me?.id) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} render={() => children} />;
}

export default PrivateRoute;
