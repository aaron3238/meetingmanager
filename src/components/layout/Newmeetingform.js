import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default class Newmeetingform extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Form onSubmit={this.onSubmit}>
                <Form.Group>
                    <Form.Label>Meeting Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter a name for your meeting..." />
                    <Form.Text className="text-muted">
                    Ex: Weekly team meeting
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Zoom Meeting Link</Form.Label>
                    <Form.Control type="text" placeholder="Paste your zoom link here" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Presenter Name</Form.Label>
                    <Form.Control type="text" placeholder="Who is hosting the meeting?" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Days of the week</Form.Label>
                    {['checkbox'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                        <Form.Check inline label="Mon" type={type} id={`inline-${type}-mon`} />
                        <Form.Check inline label="Tue" type={type} id={`inline-${type}-tue`} />
                        <Form.Check inline label="Wed" type={type} id={`inline-${type}-wed`} />
                        <Form.Check inline label="Thur" type={type} id={`inline-${type}-thur`} />
                        <Form.Check inline label="Fri" type={type} id={`inline-${type}-fri`} />
                        </div>
                    ))}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}
