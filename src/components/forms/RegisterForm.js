import React, {useContext, Component} from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import {useAuthDataContext} from "../context/AuthContext.js"
import Modal from 'react-bootstrap/Modal'
import config from "../../config.json"
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert'
import crypto, { createHash } from 'crypto';

var testpass = false;
async function registerUser(credentials) {

    return axios.post(config.backendURL + "/user", credentials)
    .then(res => res.data)
}







function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}





export default function Register({ setToken }) {


    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [hash, setHash] = React.useState('');
    const [salt, setSalt] = React.useState('');
    const [fullName, setfullName] = React.useState('');
    const [showModal, setshowModal] = React.useState(false);
    const [showAlert, setshowAlert] = React.useState(false);

    const createHash = (pass) => {

    setPassword(pass)
    const tempSalt = crypto.randomBytes(16).toString('hex');
    const tempHash = crypto.pbkdf2Sync(password, salt, 
            1000, 64, `sha512`).toString(`hex`);
    setSalt(tempSalt)
    setHash(tempHash)
}
    const submit = async e => {
        e.preventDefault();
        

        if(validateEmail(email)){
            const token = await registerUser({
                email: email,
                name: fullName,
                password: password
            });
            console.log(token);
            if(token){
                //alert("success");
                //setToken(token);
                setshowAlert("true");
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
            <Button id="showAdd" variant="primary" size="sm" onClick={() => setshowModal(true)}>Register</Button>
            
            <Modal show={showModal} enforceFocus={true} autoFocus={true}>
            <Alert show={showAlert} variant="success" onClose={() => setshowAlert(false)} dismissable>
                <Alert.Heading>Account created successfully.</Alert.Heading>
                <p>You may now login!</p>
            </Alert>
            <div style={{ padding: "1rem" }}>
                <Form onSubmit={submit}>
                    <h2>Register</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>
                            Email 
                        </Form.Label>
                        <Form.Control type="email" placeholder="someone@somewhere.com" value={email} onChange={e => setEmail(e.target.value)} id="email"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Full Name
                        </Form.Label>
                        <Form.Control type="text" placeholder="John Smith" value={fullName} onChange={e => setfullName(e.target.value)} id="fullName"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Password 
                        </Form.Label>
                        <Form.Control type="password" placeholder="Enter your password..." value={password} onChange={e => createHash(e.target.value)} id="password"/>
                    </Form.Group>
                    <Button type="submit" variant="primary">
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

Register.propTypes = {
  setToken: PropTypes.func.isRequired
}