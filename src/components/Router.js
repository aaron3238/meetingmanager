import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthContext from "./context/AuthContext.js"
import Body from "./layout/Body.js"
import Landing from "./layout/Landing.js"

const PrivateRoute = ({ component, ...options }) => {
  console.log("Pre auth");
  const { user } = AuthContext();
  console.log("Finished auth: " + user);
  const finalComponent = user !== undefined ? component : Landing;
  return <Route {...options} component={finalComponent} />;
};

const Router = () => (
  <Switch>
    <PrivateRoute path="/" component={Body} />
  </Switch>
);

export default Router;