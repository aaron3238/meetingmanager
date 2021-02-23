import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Meetingcard from './Meetingcard.js'
import Container from 'react-bootstrap/Container';
export default class Cardgrid extends Component{
    constructor(props){ // props are basically data that can be passed from the component above
        super(props);
    }
    
    render(){

        const rows = []
        let lastMeeting = null;
        let num=0; // this needs work
        this.props.meetings.forEach((meeting)=> {
            if(meeting.name !== lastMeeting){
                rows.push(
                    <Meetingcard key={num++} // and here
                    name={meeting.name}
                    link={meeting.link}
                    presenter={meeting.presenter}
                    weekdays={meeting.weekdays}
                    starttime={meeting.starttime}
                    endtime={meeting.endtime}/>
                );
                console.log(num)
            }
            lastMeeting = meeting.name;
        });
        return(
            
            <Container>
                Meetings
                {rows}
            </Container>
            
            
        );
    }
}


