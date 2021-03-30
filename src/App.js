
import React, {useState, Component} from "react";
import Body from "./components/layout/Body.js"
import {Route, Switch, BrowserRouter} from "react-router-dom";
import Router from "./components/Router";
import Landing from './components/layout/Landing'
import useToken from './components/hooks/useToken';
import DeleteWarning from "./components/forms/DeleteWarning"
import axios from 'axios'
import config from './config.json'

//import CardColumns from 'react-bootstrap/CardColumns'

function App() {
  const { token, setToken } = useToken();
   
  if(!token) {
    return <Landing setToken={setToken}/>
  }
  return (
    
    <BrowserRouter>
          <Body token={token}/>
    </BrowserRouter>
  )
}


export default App;