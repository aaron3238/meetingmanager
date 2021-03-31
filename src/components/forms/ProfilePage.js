import React, {useContext, Component, useEffect} from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import {useAuthDataContext} from "../context/AuthContext.js"
import Modal from 'react-bootstrap/Modal'
import config from "../../config.json"
import PropTypes from 'prop-types';

async function getUser(id) {
    return axios.get(config.backendURL + "/user/" + id)
    .then(res => res.data)
}

async function editUser(user){
    return axios.post(config.backendURL + "/user/" + user._id, user)
    .then(res => res.data)
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export default function Profile({token}){



    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [fullName, setfullName] = React.useState('');
    const [showModal, setshowModal] = React.useState(false);

    useEffect(() =>{
        getUser(token)
        .then(user => {
            setEmail(user.email);
            setPassword(user.password);
            setfullName(user.name);
        })
    }, []);

    const submit = async e => {
         
        e.preventDefault();
        const updatedUser = {
            email: email,
            name: fullName,
            password: password,
            _id: token
        }
        console.log("hits")
        console.log(updatedUser.email)
        var x = validateEmail(updatedUser.email);
        console.log(x)




        if( x == true)
        {
            editUser(updatedUser);
            setshowModal(false);

        }else{
            alert("Make sure you have a correct email")
        }
        
    
    }

    return(
        <>
            <Button id="showAdd" variant="info" size="sm" onClick={() => setshowModal(true)}>Profile</Button>
            <Modal show={showModal} enforceFocus={true} autoFocus={true}>
                <div style={{ padding: "1rem" }}>
                    <Form>
                        <h2>Edit Profile</h2>
                        <Form.Group>
                            <Form.Label>
                                Email 
                            </Form.Label>
                            <Form.Control type="text" placeholder="someone@somewhere.com" value={email} onChange={e => setEmail(e.target.value)} id="email"/>
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
                            <Form.Control type="text" placeholder="Enter your password..." value={password} onChange={e => setPassword(e.target.value)} id="password"/>
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
    )
}

Profile.propTypes = {
    token: PropTypes.string.isRequired
}