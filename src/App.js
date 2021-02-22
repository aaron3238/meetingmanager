/*global chrome*/
import React from "react";
//import Topbarnav from "./components/layout/Topbarnav.js"
import Body from "./components/layout/Body.js"
import Newmeetingform from "./components/layout/Newmeetingform";
import CreateMeetingForm from "./components/layout/CreateMeetingForm";
import useMeetings from "./components/layout/hooks/useMeetings";
import "./App.css";
import Meetingcard from "./components/layout/Meetingcard.js";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// const handleSaveToPC = (jsonData,filename) => {
//   const fileData = JSON.stringify(jsonData);
//   const blob = new Blob([fileData], {type: "text/plain"});
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.download = `${filename}.json`;
//   link.href = url;
//   link.click();
// };




const App = () => {

  const[meetings, addMeeting, editMeeting, deleteMeeting] = useMeetings();

  // const MEETINGS = [
  //   {
  //     name: "CSC252",
  //     link: "https://kutztown.zoom.us/j/485974627?pwd=MVpqeklrcmJiZ2V2aXBkRVdVS21pUT09",
  //     presenter: "Dr. Carelli",
  //     weekdays: "T, TH",
  //     starttime: "3:00 PM",
  //     endtime: "4:20 PM",
  //   },
  //   {
  //     name: "CSC464",
  //     link: "https://kutztown.zoom.us/j/485974627?pwd=MVpqeklrcmJiZ2V2aXBkRVdVS21pUT09",
  //     presenter: "Dr. Carelli",
  //     weekdays: "T, TH",
  //     starttime: "3:00 PM",
  //     endtime: "4:20 PM",
  //   },
  //   {
  //     name: "CSC320",
  //     link: "https://kutztown.zoom.us/j/485974627?pwd=MVpqeklrcmJiZ2V2aXBkRVdVS21pUT09",
  //     presenter: "Dr. Carelli",
  //     weekdays: "T, TH",
  //     starttime: "3:00 PM",
  //     endtime: "4:20 PM",
  //   },
  // ];


  return (
    <div className="App">
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
                <div>Delete <Button onClick={() => deleteMeeting(meeting.id)}/></div>
                <Card.Text>
                  Meeting ID: {meeting.id}
                </Card.Text>
            </Card.Body>
            </Card>

        ))}
      </div>
      <div>Delete all meetings (requires refresh) <Button onClick={() => window.localStorage.removeItem('meetings')}/></div>
      <CreateMeetingForm createNewMeeting={addMeeting}/>
    </div>
  );
}
export default App;