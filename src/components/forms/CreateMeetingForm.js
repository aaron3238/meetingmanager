import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Picktime from 'Picktime.js';
const CreateMeetingForm = ({createNewMeeting}) => {
    const [meetingName, setMeetingName] = React.useState('');
    const [meetingLink, setMeetingLink] = React.useState('');
    const [presenterName, setPresenterName] = React.useState('');
    const [mon, setMon] = React.useState(false);
    const [tue, setTue] = React.useState(false);
    const [wed, setWed] = React.useState(false);
    const [thurs, setThurs] = React.useState(false);
    const [fri, setFri] = React.useState(false);
    const [sat, setSat] = React.useState(false);
    const [sun, setSun] = React.useState(false)
    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');


    var showModal = true;
    function handleSubmit(){
        if(meetingName){
            // console.log(createNewMeeting(meetingName, meetingLink, presenterName, Dow, startTime, endTime))

                showModal=false;
        }else{
            alert("Please enter a meeting name.");
            showModal=true;
        }

    }
    function handleCancel(){
        showModal=false;
    }
    return(
        <Modal show={showModal} aninmation={true} enforceFocus={true} autoFocus={true} size='sm'>
            <Form>
                <Form.Group>
                    <Form.Label>Meeting Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter a name for your meeting..."
                    onChange={e => setMeetingName(e.target.value)} value={meetingName}/>
                    <Form.Text className="text-muted">
                    Ex: Weekly team meeting
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Zoom Meeting Link</Form.Label>
                    <Form.Control type="text" placeholder="Paste your zoom link here"
                    onChange={e => setMeetingLink(e.target.value)} value={meetingLink}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Presenter Name</Form.Label>
                    <Form.Control type="text" placeholder="Who is hosting the meeting?"
                    onChange={e => setPresenterName(e.target.value)} value={presenterName}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Days of the week</Form.Label>
                    {['checkbox'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                        {/* <Form.Check inline label="Mon" type={type} id={mon} onChange={e => Dow.setState(e.target.checked)} value={tue}/>
                        {/* <Form.Check inline label="Tue" type={type} id={`inline-${type}-tue`} onChange={e => setTue(e.target.checked)} value={tue}/>
                        <Form.Check inline label="Wed" type={type} id={`inline-${type}-wed`} onChange={e => setWed(e.target.checked)} value={wed}/>
                        <Form.Check inline label="Thur" type={type} id={`inline-${type}-thur`} onChange={e => setThurs(e.target.checked)} value={thurs}/>
                        <Form.Check inline label="Fri" type={type} id={`inline-${type}-fri`} onChange={e => setFri(e.target.checked)} value={fri}/>
                        <Form.Check inline label="Sat" type={type} id={`inline-${type}-sat`} onChange={e => setSat(e.target.checked)} value={sat}/>
                        <Form.Check inline label="Sun" type={type} id={`inline-${type}-sun`} onChange={e => setSun(e.target.checked)} value={sun}/> */} */}
                        </div>
                    ))}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control type="text" placeholder="Enter the meeting start time..."
                    onChange={e => setStartTime(e.target.value)} value={startTime}
                    />
                    
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <Form.Label>End Time</Form.Label>
                    <Form.Control type="text" placeholder="Enter the meeting end time..."
                    onChange={e => setEndTime(e.target.value)} value={endTime}
                    />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>{"  "}
                <Button variant="secondary" type="submit" onClick={handleCancel}>
                    Cancel
                </Button>
            </Form>
        </Modal>


    )
};

export default CreateMeetingForm;