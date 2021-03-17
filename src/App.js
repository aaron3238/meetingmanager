
import React, {Component} from "react";
import Topbarnav from "./components/layout/Topbarnav.js"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Styles from './App.module.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Popover from 'react-bootstrap/Popover'
import {MeetingContext} from "./components/context/MeetingContext.js"
import EditMeetingFormClass from "./components/forms/EditMeetingFormClass.js"

//import CardColumns from 'react-bootstrap/CardColumns'


class App extends Component{
  constructor(props){
    super(props);



    this.getMeetings = () => {
      const myMeetings = window.localStorage.getItem('meetings');
      const parsedMeetings = JSON.parse(myMeetings);
      return parsedMeetings;
    }

    this.updateMeetings = (newMeetings) => {
        const stringifiedMeetings = JSON.stringify(newMeetings);
        window.localStorage.setItem('meetings', stringifiedMeetings);
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
    this.redirectUrl = (url) => {
      window.open(url);
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
    const meetings = window.localStorage.getItem('meetings');
    const parsed = JSON.parse(meetings)
    if(meetings){
      this.setState({meetings: parsed})
    }
  }

  render(){
    return (
      <div className={Styles.App}>
        <MeetingContext.Provider value={this.state}>
        <Topbarnav/>
        <div className={Styles.meetingContainer}>
          <h2>Your Meetings</h2>
          <hr/>
          {this.state.meetings.map(meeting => (
            
              <Card variant="dark" className={Styles.Card}>
              <Card.Body className={Styles.meetingInfo}>
                  <Card.Title>{meeting.meetingName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{meeting.presenterName}</Card.Subtitle>
                  <Card.Text>
                  Starts: {meeting.startTime}{"\n"}
                  Ends: {meeting.endTime}{"\n"}
                  </Card.Text>
                  {/* <a target="_blank" rel="noreferrer" href={meeting.meetingLink}>Link</a> */}
                  <OverlayTrigger overlay={<Tooltip id="popover-basic">Click to join your meeting.</Tooltip>}>
                  <Card.Link href={meeting.meetingLink} target="_blank" className={Styles.Link}> Join Meeting </Card.Link>
                  </OverlayTrigger>
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
        {/* <div className={Styles.Bottom}>Delete all meetings (requires refresh) <Button onClick={() => window.localStorage.removeItem('meetings')}/></div> */}
        </MeetingContext.Provider>
      </div>
    );
  }
}

App.contextType = MeetingContext;
export default App;