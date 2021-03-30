import React, {Component} from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import {AuthContext} from "../context/AuthContext.js"
import Modal from 'react-bootstrap/Modal'
import config from "../../config.json"

export default class LoginFormClass extends Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onLogin = 
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(){
        //send the api our data
        axios.post(config.backendURL + "/user/login", this.state)
        .then(res => {
            console.log(res)
            localStorage.setItem("user", res.data)
            this.props.onLogin(res.data)
        })
        .catch(err => console.log(err))
        //(Set the user in the context && redirect) || Error message

    }

    render(){
        return(
            <div style={{ padding: "1rem" }}>
            <Form>
                <Form.Group>
                    <Form.Label>
                        Email 
                    </Form.Label>
                    <Form.Control type="text" placeholder="someone@somewhere.com" 
                    onChange={this.handleChange} id="email" value={this.state.email}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Password 
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter your password..." 
                    onChange={this.handleChange} id="password" value={this.state.password}/>
                </Form.Group>
                <Button variant="primary" onClick={this.handleSubmit}>
                        Submit
                </Button>{"  "}
            </Form>
            </div>
        )
    }
}

