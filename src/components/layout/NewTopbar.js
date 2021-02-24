import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import useMeetings from "./hooks/useMeetings.js"
import CreateMeetingFormClass from "./CreateMeetingFormClass.js";
import { render } from "@testing-library/react";


// onClick={render(<CreateMeetingForm createNewMeeting={addMeeting}/>)}



const NewTopBar = () => {
    const[meetings, addMeeting, editMeeting, deleteMeeting] = useMeetings();

    

    function handleAdd(){
        render(<CreateMeetingFormClass/>);
    };
    return(

        <Navbar bg="dark" variant="dark">
        <Nav className="container-fluid">
          <Nav.Item>
            <Navbar.Brand href="#home">
            <img
              alt=""
              src="logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Meeting Manager
            </Navbar.Brand>
          </Nav.Item>

          <Nav.Item className="ml-auto">
          <Button variant="primary" size="sm" onClick={handleAdd}>Add</Button>
          {/* <CreateMeetingForm createNewMeeting={addMeeting}/> */}
          </Nav.Item>
          
        
        </Nav>
      </Navbar>

    );

}

export default NewTopBar;