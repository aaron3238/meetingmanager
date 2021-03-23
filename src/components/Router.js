import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAuthDataContext } from "./context/AuthContext.js"
import Body from "./layout/Body.js"
import Landing from "./layout/Landing.js"

const PrivateRoute = ({ component, ...options }) => {
  console.log("Pre auth");
  const  { authData, isLoggedIn } = useAuthDataContext();
  isLoggedIn()
  console.log("Finished auth: ");
  console.log(authData);
  const finalComponent = authData != null ? component : Landing;
  return <Route {...options} component={finalComponent} />;
};

const Router = () => (
  <Switch>
    <PrivateRoute path="/" component={Body} />
  </Switch>
);

export default Router;