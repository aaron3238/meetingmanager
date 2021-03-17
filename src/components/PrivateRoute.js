import React, { useContext } from 'react'
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {MeetingContext} from "./context/MeetingContext.js"
const PrivateRoute = props => {

    const context = useContext(MeetingContext)

    const renderApp = ({ component: Component, user, ...rest}) => {
        return(
            <Route
                {...rest}
                render={props =>
                user !== {} ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/landing" />
                )
                }
            />
        )
    }

    return (
        <div>
        {renderApp(context)}
        </div>
    )

}

export default PrivateRoute;
