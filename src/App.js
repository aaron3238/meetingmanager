
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
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [meetingID, setMeetingID] = useState('');
 
  const deleteMeeting = (id) =>{
    setShowDeleteWarning(true)
    console.log('delete', id)
    setMeetingID(id)
    console.log(meetingID)
  }
 
 const deleteConfirmed = () =>{
  setShowDeleteWarning(false);
  axios.delete(config.backendURL + "/meeting/" + meetingID);
  console.log("delete complete")

 }
  
  if(!token) {
    return <Landing setToken={setToken}/>
  }
  return (
    
    <BrowserRouter>
          {showDeleteWarning && <DeleteWarning onClose={() => setShowDeleteWarning(false)} onDelete={() => deleteConfirmed()}/>}
          <Body token={token} onDelete={() => deleteMeeting}/>
    </BrowserRouter>
  )
}


export default App;