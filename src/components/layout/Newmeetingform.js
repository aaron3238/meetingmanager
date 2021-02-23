import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Newmeetingform extends Component{
    constructor(props){
        super(props);
        this.state = {
            'meetingDetails':{
                'meetingName': '',
                'meetingLink': '',
                'presenterName': '',
                'mon': false,
                'tue': false,
                'wed': false,
                'thurs': false,
                'fri': false,
                'sat': false,
                'sun': false,
            },
        }
    }
    
    onFormChange(e) {

        let updatedMeetingDetails = Object;
        //console.log("type: " + e.target.type + " name: " + e.target.name)
        //console.log("this is a checkbox");
        //console.log(e.target.type + e.target.checked)
        const name = e.target.name;
        
        if(e.target.type==='checkbox'){
            const val = e.target.checked;
            updatedMeetingDetails = Object.assign({}, this.state.meetingDetails, {[name]: val})
        }else{
            const val = e.target.value;
            updatedMeetingDetails = Object.assign({}, this.state.meetingDetails, {[name]: val})
        }
        this.setState({
            'meetingDetails': updatedMeetingDetails
        })

    }

    onFormSubmit(e){
        e.preventDefault();
        console.log('Meeting Details: ', this.state.meetingDetails);
        window.alert(`You submitted:\n\n${JSON.stringify(this.state.meetingDetails)}`);
    }

    render(){

        return  (
            
            <Form onSubmit={this.onFormSubmit.bind(this)}>
                <Form.Group>
                    <Form.Label>Meeting Name</Form.Label>
                    <Form.Control name ="meetingName" type="text" placeholder="Enter a name for your meeting..."
                        onChange={this.onFormChange.bind(this)} 
                        //value={this.state.meetingDetails['meetingName']}
                    />
                    <Form.Text className="text-muted">
                    Ex: Weekly team meeting
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Zoom Meeting Link</Form.Label>
                    <Form.Control name ="meetingLink" type="text" placeholder="Paste your zoom link here"
                        onChange={this.onFormChange.bind(this)}
                        //value={this.state.meetingDetails['meetingLink']}
                    />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Presenter Name</Form.Label>
                    <Form.Control name ="presenterName" type="text" placeholder="Who is hosting the meeting?"
                        onChange={this.onFormChange.bind(this)}
                        //value={this.state.meetingDetails['presenterName']} 
                    />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Days of the week</Form.Label>
                    {['checkbox'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                        <Form.Check inline label="Mon" name = "mon" type={type} id={`inline-${type}-mon`} onChange={this.onFormChange.bind(this)} />
                        <Form.Check inline label="Tue" name = "tue" type={type} id={`inline-${type}-tue`} onChange={this.onFormChange.bind(this)} />
                        <Form.Check inline label="Wed" name = "wed" type={type} id={`inline-${type}-wed`} onChange={this.onFormChange.bind(this)} />
                        <Form.Check inline label="Thur" name = "thurs" type={type} id={`inline-${type}-thur`} onChange={this.onFormChange.bind(this)} />
                        <Form.Check inline label="Fri" name = "fri" type={type} id={`inline-${type}-fri`} onChange={this.onFormChange.bind(this)} />
                        <Form.Check inline label="Sat" name = "sat" type={type} id={`inline-${type}-sat`} onChange={this.onFormChange.bind(this)} />
                        <Form.Check inline label="Sun" name = "sun" type={type} id={`inline-${type}-sun`} onChange={this.onFormChange.bind(this)} />
                        </div>
                    ))}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}
