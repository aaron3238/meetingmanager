import React, {useContext, Component} from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import {useAuthDataContext} from "../context/AuthContext.js"
import Modal from 'react-bootstrap/Modal'
import config from "../../config.json"
import PropTypes from 'prop-types';
var testfail = false;
async function loginUser(credentials) {
    return axios.post(config.backendURL + "/user/login", credentials)
    .then(res => res.data)

}



function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default function Login({ setToken }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showModal, setshowModal] = React.useState(false);

    const submit = async e => {
        e.preventDefault();
        if(validateEmail(email)){
            const token = await loginUser({
                email: email,
                password: password
            });
            
            if(token){
                //alert("success");
                setToken(token);
                
                window.location = ""
                
            }else{
                alert("unsuccessful");
            }
        }else{
            
            alert("Make sure you have a correct email")
        }


       
    }
    
    return(
        <>
            <Button id="showAdd" variant="primary" size="sm" onClick={() => setshowModal(true)}>Login</Button>
            <Modal show={showModal} enforceFocus={true} autoFocus={true}>
                <div style={{ padding: "1rem" }}>
                    <Form>
                        <h2>Login</h2>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>
                                Email 
                            </Form.Label>
                            <Form.Control type="text" placeholder="someone@somewhere.com" value={email} onChange={e => setEmail(e.target.value)} id="email"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Password 
                            </Form.Label>
                            <Form.Control type="password" placeholder="Enter your password..." value={password} onChange={e => setPassword(e.target.value)} id="password"/>
                        </Form.Group>
                        <Button onClick={submit} variant="primary">
                            Submit
                        </Button>{"  "}
                        <Button variant="secondary" onClick={() => setshowModal(false)}>
                            Cancel
                        </Button>
                    </Form>
                </div>
            </Modal>
        </>
    );
}

Login.propTypes = {
    
  setToken: PropTypes.func.isRequired
}