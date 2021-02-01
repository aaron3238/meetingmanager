import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Cardgrid from "./Cardgrid.js"

// import Newmeetingform from './Newmeetingform.js';
export default class Body extends Component{
    constructor(props){ // props are basically data that can be passed from the component above
        super(props);
    }
    render(){
        return(
            <Jumbotron className="mb-0" fluid>
            <Container>
                <Cardgrid meetings={this.props.meetings} />
            </Container>

            </Jumbotron>
        )
    }
}
