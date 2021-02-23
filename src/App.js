
import React from "react";
import NewTopBar from "./components/layout/NewTopbar.js"
import Body from "./components/layout/Body.js"
import Newmeetingform from "./components/layout/Newmeetingform";
import CreateMeetingForm from "./components/layout/CreateMeetingForm";
import EditMeetingForm from "./components/layout/EditMeetingForm";
import "./App.css";
import Meetingcard from "./components/layout/Meetingcard.js";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import useMeetings from "./components/layout/hooks/useMeetings.js"
import { render } from "@testing-library/react";




const App = () => {

  const[meetings, addMeeting, editMeeting, deleteMeeting] = useMeetings();

  return (
    <div className="App">
      <NewTopBar/>
      <div className="meeting-container">
        <h2>Your meetings</h2>
        <hr/>
        {meetings.map(meeting => (
            <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{meeting.meetingName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{meeting.presenterName}</Card.Subtitle>
                <Card.Text>
                Starts: {meeting.startTime}{"\n"}
                Ends: {meeting.endTime}{"\n"}
                </Card.Text>
                <Card.Link href={meeting.meetingLink} target="_blank" >Card Link
                </Card.Link>

                <Card.Text>
                  Meeting ID: {meeting.id}
                </Card.Text>
            </Card.Body>
            <div>
                <Button size="sm" variant="danger" onClick={() => deleteMeeting(meeting)}>Delete</Button> {"  "}
                <Button size="sm" variant="secondary" onClick={console.log("edit")}>Edit</Button>
              </div>
              
            </Card>

        ))}
      </div>
      <div>Delete all meetings (requires refresh) <Button onClick={() => window.localStorage.removeItem('meetings')}/></div>
      {/* <CreateMeetingForm createNewMeeting={addMeeting}/> */}
    </div>
  );
}
export default App;