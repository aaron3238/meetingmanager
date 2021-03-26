import React, {Component} from "react";
import LoginForm from "../forms/LoginForm.js"
import RegisterForm from "../forms/RegisterForm.js"

export default class Landing extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
            <h2>Please register, or login.</h2>
            <RegisterForm setToken={this.props.setToken}/>
            {'  '}
            <LoginForm setToken={this.props.setToken}/>
            </div>
        )
    }
}