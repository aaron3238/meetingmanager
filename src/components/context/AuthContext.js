import React, { createContext, useState, useEffect, useMemo, useContext } from "react";
// some manager import?


export const AuthDataContext = createContext(null);

export const AuthContext = props => {
    var authData = null

    /* The first time the component is rendered, it tries to
    * fetch the auth data from a source, like a cookie or
    * the localStorage.
    */

    //useEffect(() => {
    //    const currentAuthData = window.localStorage.getItem('user');
    //    // console.log(JSON.parse(currentAuthData));
    //    console.log("Effect Used" + currentAuthData);
    //    if (currentAuthData) {
    //        console.log("Data set");
    //        setAuthData(currentAuthData);
    //    }
    //}, []);

    const isLoggedIn = () => {
        const currentAuthData = window.localStorage.getItem('user');
        console.log("Effect Used" + currentAuthData);
        if (currentAuthData) {
            authData = currentAuthData;
        } else {
            authData = null;
        }
    }

    const onLogout = () => authData = undefined;

    const onLogin = newAuthData => {
        console.log("The HOOKS" + newAuthData);
        authData = newAuthData;
        window.localStorage.setItem("user", newAuthData);
    }


    //const authDataValue = useMemo({...authData, onLogin, onLogout }, [authData]);

    return <AuthDataContext.Provider value={{isLoggedIn, onLogin, onLogout}} {...props} />;
};

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthContext;