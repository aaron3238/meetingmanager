
import React, {Component} from "react";
import Topbarnav from "./components/layout/Topbarnav.js"
// import EditMeetingForm from "./components/layout/EditMeetingForm";
import "./App.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import {MeetingContext} from "./components/layout/context/MeetingContext.js"





class App extends Component{
  constructor(props){
    super(props);


    this.updateMeetings = (newMeetings) => {
        const stringifiedMeetings = JSON.stringify(newMeetings);
        window.localStorage.setItem('meetings', stringifiedMeetings);
        this.setState({meetings: newMeetings});
    };

    this.addMeeting = (newMeeting) => {
        this.updateMeetings([...this.state.meetings, newMeeting]);
        console.log("add");
    };

    this.deleteMeeting = (id) => {
        // const meetingIdx = this.state.meetings.findIndex(meeting => meeting.id===id);
        // console.log(meetings[meetingIdx]);
        // console.log("meetingid: " + meetings[meetingIdx].id + " id:" + id);
        // console.log(meetings)
        const filtered = this.state.meetings.filter(function(item){
            return item.id !== id;
        })
        console.log(filtered);
        this.updateMeetings(filtered);
    }


    this.state = {
      meetings: [],
      updateMeetings: this.updateMeetings,
      addMeeting: this.addMeeting,
      deleteMeeting: this.deleteMeeting,
    }
  }

  componentWillMount(){
    const meetings = window.localStorage.getItem('meetings');
    const parsed = JSON.parse(meetings)
    if(meetings){
      this.setState({meetings: parsed})
    }
  }

  // handleDelete(e) {
  //   this.deleteMeeting
  // }

  render(){
    return (
      <div className="App">
        <MeetingContext.Provider value={this.state}>
        <Topbarnav/>
        <div style={{ padding: "1rem" }} className="meeting-container">
          <h2>Your meetings</h2>
          <hr/>
          {this.state.meetings.map(meeting => (
              <Card style={{ width: '18rem' }}>
              <Card.Body>
                  <Card.Title>{meeting.meetingName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{meeting.presenterName}</Card.Subtitle>
                  <Card.Text>
                  Starts: {meeting.startTime}{"\n"}
                  Ends: {meeting.endTime}{"\n"}
                  </Card.Text>
                  {/* <a target="_blank" rel="noreferrer" href={meeting.meetingLink}>Link</a> */}
                  <Card.Link href={meeting.meetingLink} target="_blank" > Link </Card.Link>
                  <Card.Text>
                    {meeting.mon}
                  </Card.Text>
          
                  <Card.Text>
                    Meeting ID: {meeting.id}
                  </Card.Text>
              </Card.Body>
                <div style={{ padding: "1rem" }}>
                  <Button size="sm" variant="danger" onClick={() => this.deleteMeeting(meeting.id)}>Delete</Button> {"  "}
                  <Button size="sm" variant="secondary" onClick={console.log("edit")}>Edit</Button>
                </div>

              </Card>

          ))}
        </div>
        <div>Delete all meetings (requires refresh) <Button onClick={() => window.localStorage.removeItem('meetings')}/></div>
        {/* <CreateMeetingForm createNewMeeting={addMeeting}/> */}
        </MeetingContext.Provider>
      </div>
    );
  }
}

App.contextType = MeetingContext;
export default App;