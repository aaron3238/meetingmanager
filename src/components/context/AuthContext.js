import React, { createContext, useState, useEffect, useMemo, useContext } from "react";
// some manager import?


export const AuthDataContext = createContext(null);

const initialAuthData = {};

export const AuthContext = props => {
    const [authData, setAuthData] = useState(initialAuthData);

    /* The first time the component is rendered, it tries to
    * fetch the auth data from a source, like a cookie or
    * the localStorage.
    */
    useEffect(() => {
        const currentAuthData = window.localStorage.user;
        if (currentAuthData) {
        setAuthData(currentAuthData);
        }
    }, []);

    const onLogout = () => setAuthData(initialAuthData);

    const onLogin = newAuthData => setAuthData(newAuthData);

    // const authDataValue = useMemo({ ...authData, onLogin, onLogout }, [authData]);

    return <AuthDataContext.Provider value={{ ...authData, onLogin, onLogout }} {...props} />;
};

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthContext;