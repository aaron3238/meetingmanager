import React, {Component} from "react";
import LoginForm from "../forms/LoginForm.js"


export default class Landing extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
            <LoginForm setToken={this.props.setToken}/>
            </div>
        )
    }
}