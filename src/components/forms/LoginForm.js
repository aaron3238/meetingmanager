import React, {useContext, Component} from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import {useAuthDataContext} from "../context/AuthContext.js"
import Modal from 'react-bootstrap/Modal'
import config from "../../config.json"
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return axios.post(config.backendURL + "/user/login", credentials)
    .then(res => res.data)
}

export default function Login({ setToken }) {
    const [email, setEmail] = React.useState('aaronp@gmail.com');
    const [password, setPassword] = React.useState('yomamma');

    const submit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email: email,
            password: password
        });
        setToken(token);
        window.location = ""
    }
    
    return(
        <Form>
            <h2>Login</h2>
            <Form.Group>
                <Form.Label>
                    Email 
                </Form.Label>
                <Form.Control type="text" placeholder="someone@somewhere.com" value={email} onChange={e => setEmail(e.target.value)} id="email"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Password 
                </Form.Label>
                <Form.Control type="text" placeholder="Enter your password..." value={password} onChange={e => setPassword(e.target.value)} id="password"/>
            </Form.Group>
            <Button onClick={submit} variant="primary">
                Submit
            </Button>{"  "}
        </Form>
    );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}