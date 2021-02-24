import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import TimePicker from 'react-time-picker' // https://github.com/wojtekmaj/react-time-picker
import { v4 as uuid } from 'uuid'

import {MeetingContext} from './context/MeetingContext.js'

export default class CreateMeetingFormClass extends Component{
    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeDow = this.onChangeDow.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this);
        this.onChangeEndTime = this.onChangeEndTime.bind(this);
        this.state = {
            meetingName: '',
            meetingLink: '',
            presenterName: '',
            startTime: '',
            endTime: '',
            daysOfWeek: {
                Monday: false,
                Tuesday: false,
                Wednesday: false,
                Thursday: false,
                Friday: false,
                Saturday: false,
                Sunday: false
            },
            minutesBeforeRemind: 30,
            // Modal
            showModal: false,
        }
        
    }
    // text change
    onChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    // handles days of the week checkbox changes
    onChangeDow(e){
        var updateState = {...this.state.daysOfWeek}
        updateState[e.target.id] = e.target.checked
        this.setState({
            daysOfWeek: {...updateState}
        })
    }

    // handle start time change
    onChangeStartTime(date){
        console.log(typeof(date))
        console.log(date);
        this.setState({
            startTime: date
        })
    }
    //handle end time change
    onChangeEndTime(date){
        this.setState({
            endTime: date
        })
    }


    // handles showing the form modal
    handleShow(){
        this.setState({
            showModal: true
        })
    }
    // handles the cancel button at the bottom of the form
    handleCancel(){
        this.setState({
            showModal: false
        })
    }
    // handles the submit button at the buttom of the form
    handleSubmit(){
        const newMeeting = {
            meetingName: this.state.meetingName,
            meetingLink: this.state.meetingLink,
            presenterName: this.state.presenterName,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            daysOfWeek: this.state.daysOfWeek,
            minutesBeforeRemind: this.state.minutesBeforeRemind,
            id: uuid()
        }

        this.context.addMeeting(newMeeting);
        this.setState({
            showModal: false
        })
        

    }
    render(){
        return(
            <>
            <Button id="showAdd" variant="primary" size="sm" onClick={this.handleShow}>Add</Button>
            <Modal show={this.state.showModal} enforceFocus={true} autoFocus={true} size='sm'>
                <div style={{ padding: "1rem" }}>
                <Form>
                    <Form.Group>
                        <Form.Label>Meeting Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter a name for your meeting..."
                        onChange={this.onChange} id="meetingName" value={this.state.meetingName}/>
                        <Form.Text className="text-muted">
                        Ex: Weekly team meeting
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Zoom Meeting Link</Form.Label>
                        <Form.Control type="text" placeholder="Paste your zoom link here"
                        onChange={this.onChange} id="meetingLink" value={this.state.meetingLink}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Presenter Name</Form.Label>
                        <Form.Control type="text" id="presenterName" placeholder="Who is hosting the meeting?"
                        onChange={this.onChange} value={this.state.presenterName}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Days of the week</Form.Label>
                        {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                            <Form.Check inline label="Mon" type={type} id="Monday" onChange={this.onChangeDow}/>
                            <Form.Check inline label="Tue" type={type} id="Tuesday" onChange={this.onChangeDow}/>
                            <Form.Check inline label="Wed" type={type} id="Wednesday" onChange={this.onChangeDow}/>
                            <Form.Check inline label="Thurs" type={type} id="Thursday" onChange={this.onChangeDow}/>
                            <Form.Check inline label="Fri" type={type} id="Friday" onChange={this.onChangeDow}/>
                            <Form.Check inline label="Sat" type={type} id="Saturday" onChange={this.onChangeDow}/>
                            <Form.Check inline label="Sun" type={type} id="Sunday" onChange={this.onChangeDow}/>
                            </div>
                        ))}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Start Time: </Form.Label>{"  "}
                        <TimePicker disableClock={true} onChange={this.onChangeStartTime} value={this.state.startTime}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                        <Form.Label>End Time: </Form.Label>
                        <TimePicker disableClock={true} onChange={this.onChangeEndTime} value={this.state.endTime}/>
                        <Form.Label>Remind me minutes before</Form.Label> {"  "}
                        <Form.Control type="text" id="minutesBeforeRemind"
                        onChange={this.onChange} value={this.state.minutesBeforeRemind}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </Button>{"  "}
                    <Button variant="secondary" type="submit" onClick={this.handleCancel}>
                        Cancel
                    </Button>
                </Form>
                </div>
            </Modal>  
            </>
            )
        }
}

CreateMeetingFormClass.contextType = MeetingContext;