import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ProfilePage from "../forms/ProfilePage.js"
import Button from "react-bootstrap/Button";
import HelpPage from "../HelpPage.js";

import CreateMeetingFormClass from "../forms/CreateMeetingFormClass.js";

export default class Topbarnav extends Component{
    constructor(props){ // props are basically data that can be passed from the component above
        super(props);

        this.state = {
          showAdd: false
        }
    }

    onChange(e) {
      this.setState({
          [e.target.id]: e.target.value
      })
    }
    
    render(){
        return(
          <Navbar bg="dark" variant="dark">
            <Nav className="container-fluid">

            <Nav.Item className="center">
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
              <Nav.Item className="mr-auto">
                  <ProfilePage token={this.props.token}></ProfilePage> {'  '}
                  <Button size="sm" variant="secondary" 
                    onClick={()=>{window.localStorage.removeItem("token"); window.location=""}}>Logout
                  </Button> {'  '}
                  <HelpPage></HelpPage>
              </Nav.Item>


              <Nav.Item>
                <CreateMeetingFormClass updateData={this.props.updateData} token={this.props.token} showModal={this.showAdd}/>
              </Nav.Item>


                
            
            </Nav>
          </Navbar>
        )
    }
}