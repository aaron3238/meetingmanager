import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import TimePicker from 'react-time-picker' // https://github.com/wojtekmaj/react-time-picker
import axios from 'axios';
import config from '../../config'


export default class EditMeetingFormClass extends Component{
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
            meetingName: props.meeting.meetingName,
            meetingLink: props.meeting.meetingLink,
            presenterName: props.meeting.presenterName,
            startTime: props.meeting.startTime,
            endTime: props.meeting.endTime,
            daysOfWeek: {...props.meeting.daysOfWeek},
            minutesBeforeRemind: props.meeting.minutesBeforeRemind,
            _id: props.meeting._id,
            showModal: false,
        }
        
    }
    
    isvalidURL(str) {
        var pattern = new RegExp(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        ); 
        return pattern.test(str);
        }
        
    isnotempty(str) {
        var pattern = new RegExp(/^(\w+\S+)$/); 
        return pattern.test(str);
        }

    isNormalInteger(str) {
        var n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    }
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
        const updatedMeeting = {
            meetingName: this.state.meetingName,
            meetingLink: this.state.meetingLink,
            presenterName: this.state.presenterName,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            daysOfWeek: this.state.daysOfWeek,
            minutesBeforeRemind: this.state.minutesBeforeRemind,
            user: this.props.token,
            _id: this.state._id
        }
        var intcheck = false;
        console.log(typeof updatedMeeting.minutesBeforeRemind)
        if(typeof updatedMeeting.minutesBeforeRemind.isNormalInteger){
            console.log(updatedMeeting.minutesBeforeRemind)
            console.log("is postive")
            var x = updatedMeeting.minutesBeforeRemind > 0
            console.log(x)

            if(x == true)
            {
             intcheck = true;   
            }
            else{
                console.log("its not a number");
            }
        }









        //tests
        var link = this.isvalidURL(updatedMeeting.meetingLink)
        var isnote = this.isnotempty(updatedMeeting.meetingName)
        var pname = this.isnotempty(updatedMeeting.presenterName)
       
       
        
        
       
        var daysofweek = updatedMeeting.daysOfWeek
        var result = false
        var failedtest = false
        for (var i in daysofweek) {
            if (daysofweek[i] == true) {
                result = true;
                break;
            }
            
        }
        

        console.log("meeting name")
        console.log(isnote)
        console.log("prez name")
        console.log(pname)
        console.log("link")
        console.log(link)
        console.log("day of week")
        console.log(result)


        if (isnote == false ||
            pname == false ||
            result === false) {
         alert("all fields are needed")
            failedtest = true;
        }    



        if (intcheck == false) {
            alert("Time before meeting must be a positive int")
            failedtest = true;

          }
        
        if (link == false) {
            alert("Please fix your link, it needs https, http")
            failedtest = true;

          }
        
        console.log("this is the submit")
        console.log(failedtest)

        //end tests






        if (failedtest == false) {
        axios.post(config.backendURL + "/meeting/" + this.state._id, updatedMeeting)
        .then(res => {
            this.props.updateData(this.props.token)
            console.log("Updated Meeting")
        })

        this.setState({
                showModal: false
        })
        }
        

    }
    render(){
        return(
            <>
            <Button id="showEdit" variant="secondary" size="sm" onClick={this.handleShow}>Edit</Button>
            <Modal show={this.state.showModal} enforceFocus={true} autoFocus={true}>
                <div style={{ padding: "1rem" }}>
                <Form>
                    <Form.Group>
                        <Form.Label>Meeting Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter a name for your meeting..."
                        onChange={this.onChange} id="meetingName" value={this.state.meetingName}/>
                        {/* <Form.Text className="text-muted">
                        Ex: Weekly team meeting
                        </Form.Text> */}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Zoom Meeting Link</Form.Label>
                        <Form.Control type="text" placeholder="Paste your zoom link here"
                        onChange={this.onChange} id="meetingLink" value={this.state.meetingLink}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Presenter Name</Form.Label>
                        <Form.Control type="text" id="presenterName" placeholder="Who is hosting the meeting?"
                        onChange={this.onChange} value={this.state.presenterName}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Days of the week</Form.Label>
                        {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                            <Form.Check inline label="Mon" checked={this.state.daysOfWeek.Monday} type={type} id="Monday" onChange={this.onChangeDow}/>
                            <Form.Check inline label="Tue" checked={this.state.daysOfWeek.Tuesday} type={type} id="Tuesday" onChange={this.onChangeDow}/>
                            <Form.Check inline label="Wed" checked={this.state.daysOfWeek.Wednesday} type={type} id="Wednesday" onChange={this.onChangeDow}/>
                            <Form.Check inline label="Thur" checked={this.state.daysOfWeek.Thursday} type={type} id="Thursday" onChange={this.onChangeDow}/>
                            <Form.Check inline label="Fri" checked={this.state.daysOfWeek.Friday} type={type} id="Friday" onChange={this.onChangeDow}/>
                            <Form.Check inline label="Sat" checked={this.state.daysOfWeek.Saturday} type={type} id="Saturday" onChange={this.onChangeDow}/>
                            <Form.Check inline label="Sun" checked={this.state.daysOfWeek.Sunday} type={type} id="Sunday" onChange={this.onChangeDow}/>
                            </div>
                        ))}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Start Time: </Form.Label>{"  "}
                        <TimePicker disableClock={true} onChange={this.onChangeStartTime} value={this.state.startTime}/>
                        <Form.Label>End Time: </Form.Label>{"  "}
                        <TimePicker disableClock={true} onChange={this.onChangeEndTime} value={this.state.endTime}/>
                        <Form.Label>Remind me minutes before</Form.Label> {"  "}
                        <Form.Control type="text" id="minutesBeforeRemind"
                        onChange={this.onChange} value={this.state.minutesBeforeRemind}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Submit
                    </Button>{"  "}
                    <Button variant="secondary" onClick={this.handleCancel}>
                        Cancel
                    </Button>
                </Form>
                </div>
            </Modal>  
            </>
            )
        }
}