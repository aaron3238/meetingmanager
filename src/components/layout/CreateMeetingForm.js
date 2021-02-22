import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
    return(
        <Form>
            <Form.Group>
                <Form.Label>Meeting Name</Form.Label>
                <Form.Control name ="meetingName" type="text" placeholder="Enter a name for your meeting..."
                 onChange={e => setMeetingName(e.target.value)} value={meetingName}/>
                <Form.Text className="text-muted">
                Ex: Weekly team meeting
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Zoom Meeting Link</Form.Label>
                <Form.Control name ="meetingLink" type="text" placeholder="Paste your zoom link here"
                 onChange={e => setMeetingLink(e.target.value)} value={meetingLink}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Presenter Name</Form.Label>
                <Form.Control name ="presenterName" type="text" placeholder="Who is hosting the meeting?"
                 onChange={e => setPresenterName(e.target.value)} value={presenterName}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Days of the week</Form.Label>
                {['checkbox'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                    <Form.Check inline label="Mon" name = "mon" type={type} id={`inline-${type}-mon`} onChange={e => setMon(e.target.checked)} value={mon}/>
                    <Form.Check inline label="Tue" name = "tue" type={type} id={`inline-${type}-tue`} onChange={e => setTue(e.target.checked)} value={tue}/>
                    <Form.Check inline label="Wed" name = "wed" type={type} id={`inline-${type}-wed`} onChange={e => setWed(e.target.checked)} value={wed}/>
                    <Form.Check inline label="Thur" name = "thurs" type={type} id={`inline-${type}-thur`} onChange={e => setThurs(e.target.checked)} value={thurs}/>
                    <Form.Check inline label="Fri" name = "fri" type={type} id={`inline-${type}-fri`} onChange={e => setFri(e.target.checked)} value={fri}/>
                    <Form.Check inline label="Sat" name = "sat" type={type} id={`inline-${type}-sat`} onChange={e => setSat(e.target.checked)} value={sat}/>
                    <Form.Check inline label="Sun" name = "sun" type={type} id={`inline-${type}-sun`} onChange={e => setSun(e.target.checked)} value={sun}/>
                    </div>
                ))}
            </Form.Group>
            <Form.Group>
                <Form.Label>Start Time</Form.Label>
                <Form.Control name ="startTime" type="text" placeholder="Enter the meeting start time..."
                 onChange={e => setStartTime(e.target.value)} value={startTime}
                />
                <Form.Text className="text-muted">
                </Form.Text>
                <Form.Label>End Time</Form.Label>
                <Form.Control name ="endTime" type="text" placeholder="Enter the meeting end time..."
                 onChange={e => setEndTime(e.target.value)} value={endTime}
                />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={() => createNewMeeting(
                meetingName, meetingLink, presenterName, mon, tue, wed, thurs, fri, sat, sun, startTime, endTime)}>
                Submit
            </Button>
            </Form>

    )
};

export default CreateMeetingForm;