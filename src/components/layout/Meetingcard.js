



import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'

export default class Meetingcard extends Component{
    constructor(props){ // props are basically data that can be passed from the component above
        super(props);
    }
    render(){
        return(
            <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{this.props.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{this.props.presenter}</Card.Subtitle>
                <Card.Text>
                {this.props.weekdays}  {"\n"}
                Starts: {this.props.starttime}{"\n"}
                Ends: {this.props.endtime}{"\n"}
                </Card.Text>
                <Card.Link href={this.props.link} target="_blank">Card Link</Card.Link>
            </Card.Body>
            </Card>
        )
    }
}








