
import React, {Component} from "react";
import Topbarnav from "./components/layout/Topbarnav.js"
import "./App.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import {MeetingContext} from "./components/context/MeetingContext.js"
import EditMeetingFormClass from "./components/forms/EditMeetingFormClass.js"


/* global chrome */

//import CardColumns from 'react-bootstrap/CardColumns'


class App extends Component{
  constructor(props){
    super(props);



    this.getMeetings = () => {
      const myMeetings = chrome.storage.sync.get(["meetings"], ({ syncedMeetings }) => {
        console.log("get in getMeetings");
        console.log(syncedMeetings);
        const parsedMeetings = JSON.parse(syncedMeetings);
        return parsedMeetings;
      });
      console.log("mymeetings in getmeetings");
      console.log(myMeetings);
      console.log("bytes in use");
      chrome.storage.sync.getBytesInUse(["meetings"], () => {console.log("bytes in use running")});

    }

    this.updateMeetings = (newMeetings) => {
        const stringifiedMeetings = JSON.stringify(newMeetings);
        // window.localStorage.setItem('meetings', stringifiedMeetings);
        chrome.storage.sync.set({meetings: stringifiedMeetings}, ()=>{
          console.log("set");
          console.log(stringifiedMeetings);
          console.log("set meetings");
        });
        this.setState({meetings: newMeetings});
    };

    this.addMeeting = (newMeeting) => {
        this.updateMeetings([...this.state.meetings, newMeeting]);
    };
    this.editMeeting = (updatedMeeting) => {
      var theMeetings = this.getMeetings();
      for(var i=0; i< theMeetings.length; ++i){
        if(theMeetings[i]['id'] === updatedMeeting.id){
          theMeetings[i] = updatedMeeting;
        }
      }
      this.updateMeetings(theMeetings);
    }

    this.deleteMeeting = (id) => {
        // const meetingIdx = this.state.meetings.findIndex(meeting => meeting.id===id);
        // console.log(meetings[meetingIdx]);
        // console.log("meetingid: " + meetings[meetingIdx].id + " id:" + id);
        // console.log(meetings)
        const filtered = this.state.meetings.filter(function(item){
            return item.id !== id;
        })
        this.updateMeetings(filtered);
    }


    this.state = {
      meetings: [],
      updateMeetings: this.updateMeetings,
      addMeeting: this.addMeeting,
      deleteMeeting: this.deleteMeeting,
      editMeeting: this.editMeeting,
    }
  }

  componentWillMount(){
    // const meetings = window.localStorage.getItem('meetings');
    //chrome.storage.sync.clear();
    
    chrome.storage.sync.get(["meetings"], ({ syncedMeetings }) => {
      console.log("get in willmount");
      console.log("getWillMount" + syncedMeetings);
      console.log(JSON.stringify(syncedMeetings));
      if(syncedMeetings){
        const parsed = JSON.parse(syncedMeetings)
        this.setState({meetings: parsed})
      }
    });

  }

  render(){
    return (
      <div className="App" style={{height: 600, width: 800}}>
        <MeetingContext.Provider value={this.state}>
        <Topbarnav/>
        <div style={{ padding: "1rem" }} className="meeting-container">
          <h2>Your meetings</h2>
          <hr/>
          {this.state.meetings.map(meeting => (
              <Card variant="dark" style={{ width: '18rem' }}>
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
                  {Object.keys(meeting.daysOfWeek).map(function(key, value) {
                    if (meeting.daysOfWeek[key]){
                      return (`${key.substring(0,3)} `);
                    }else{
                      return "";
                    }
                  })}
                  </Card.Text>
                  <Card.Text>Remind prior: {meeting.minutesBeforeRemind} minutes</Card.Text>
              </Card.Body>
                <div style={{ padding: "1rem" }}>
                  <Button size="sm" variant="danger" onClick={() => this.deleteMeeting(meeting.id)}>Delete</Button> {"  "}
                  {/* <Button size="sm" variant="secondary" onClick={console.log("edit")}>Edit</Button> */}
                  <EditMeetingFormClass meeting={meeting} showModal={this.showEdit}/>
                </div>

              </Card>

          ))}
          
        </div>
        <div>Delete all meetings (requires refresh) <Button onClick={() => {window.localStorage.removeItem('meetings'); chrome.storage.sync.clear();}}/></div>
        </MeetingContext.Provider>
      </div>
    );
  }
}

App.contextType = MeetingContext;
export default App;