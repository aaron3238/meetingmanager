import React, {Component} from "react";
import Topbarnav from "../layout/Topbarnav.js"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Styles from '../../Body.module.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import config from '../../config.json'
import axios from 'axios'
import EditMeetingFormClass from "../forms/EditMeetingFormClass.js"

// import Newmeetingform from './Newmeetingform.js';
export default class Body extends Component{
    constructor(props){ // props are basically data that can be passed from the component above
        super(props);

        this.updateData = this.updateData.bind(this);
        this.deleteMeeting = this.deleteMeeting.bind(this);

        this.redirectUrl = (url) => {
          window.open(url);
        }

        this.state = {
          meetings: [],
          token: props.token
        }
    }

  componentWillMount(){
    this.updateData(this.props.token);
  }
  // delete a meeting
  deleteMeeting(meetingID) {
    axios.delete(config.backendURL + "/meeting/" + meetingID);
    this.updateData(this.state.token);
  }

  // refresh cards for meetings
  async updateData(token) {
    await new Promise(r => setTimeout(r, 40)); // sleep for 40ms to avoid refresh issues
    var self = this;
    axios.get(config.backendURL + '/meeting/byuser/' + token)
    .then(res => {
        if (res.data != null) {
          this.setState({meetings: res.data});
        }
    })
  }

    render(){
        return(
        <div className={Styles.App}>
        <Topbarnav updateData={this.updateData} token={this.props.token}/>
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
                      <Card.Link href={meeting.meetingLink} target="_blank" className={Styles.Link}> <Button size="sm" variant="success">Join Meeting</Button> </Card.Link>
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
                      <Button size="sm" variant="danger" onClick={() => this.deleteMeeting(meeting._id)}>Delete</Button> {"  "}
                      {/* <Button size="sm" variant="secondary" onClick={console.log("edit")}>Edit</Button> */}
                      <EditMeetingFormClass updateData={ this.updateData } token={ this.props.token } meeting={meeting} showModal={this.showEdit}/>
                    </div>
                  </Card>
              ))}
            </div>
        </div>
        )
    }
}