import React, {Component} from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

export default class HelpPage extends Component{
    constructor(props){
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

        this.state = {
            showModal: false
        }
    }



    // handles showing the modal
    handleShow(){
        this.setState({
            showModal: true
        })
    }
    handleClose(){
        this.setState({
            showModal: false
        })
    }

    render(){
        return(
            <>
            <Button id="showAdd" variant="warning" size="sm" onClick={this.handleShow}>Help</Button>
            <Modal show={this.state.showModal} enforceFocus={true} autoFocus={true}>
                <div style={{ padding: "1rem" }}>
                    <h2>Help Page</h2>
                    <hr/>
                    <h4>Add Meeting</h4>
                    <p>Click the <Button size="sm" variant="primary">Add</Button> button in the top right.</p>
                    <p>Ensure that you fill out all of the information for your recurring meeting as
                        the notification service relies on your start time and days of the week.
                    </p>
                    <h4>Join Meeting</h4>
                    <p>Click the <Button size="sm" variant="success">Join Meeting</Button> button on one of your meetings.</p>
                    <h4>Delete Meeting</h4>
                    <p>Click the <Button size="sm" variant="danger">Delete</Button> button on one of your meetings.</p>
                    <h4>Edit Meeting</h4>
                    <p>Click the <Button size="sm" variant="secondary">Edit</Button> button on one of your meetings.</p>
                    <h4>Edit Profile</h4>
                    <p>Click the <Button size="sm" variant="info">Profile</Button> button.</p>
                    <p>A valid email is required to receive a notification of an upcoming meeting.</p>
                    <h4>Logout</h4>
                    <p>Click the <Button size="sm" variant="secondary">Logout</Button> button.</p>

                </div>
                <Button variant="dark" onClick={this.handleClose}>
                        Close
                </Button>
            </Modal>
            </>
        )
    }
    
}