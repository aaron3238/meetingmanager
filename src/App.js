
import React, {Component} from "react";
// import Topbarnav from "./components/layout/Topbarnav.js"
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import Styles from './App.module.css';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
// import Tooltip from 'react-bootstrap/Tooltip'
// import {MeetingContext} from "./components/context/MeetingContext.js"
// import EditMeetingFormClass from "./components/forms/EditMeetingFormClass.js"


import AuthContext from "./components/context/AuthContext.js"
// import Body from "./components/layout/Body.js"
import {Route, Switch, BrowserRouter} from "react-router-dom";
import Router from "./components/Router";


//import CardColumns from 'react-bootstrap/CardColumns'


class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
          <BrowserRouter>
            <AuthContext>
                <Router />
            </AuthContext>
          </BrowserRouter>
    );
  }
}

export default App;