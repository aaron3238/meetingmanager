import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

export default class Topbarnav extends Component{
    constructor(props){ // props are basically data that can be passed from the component above
        super(props);
    }
    render(){
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

              
  
              <Nav.Item classname="ml-auto">
              <Button variant="primary" size="sm">Add</Button>
              </Nav.Item>
              
            
            </Nav>
          </Navbar>
        )
    }
}