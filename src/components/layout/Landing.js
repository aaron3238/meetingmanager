import React, {Component} from "react";
import LoginFormClass from "../forms/LoginFormClass.js"


export default class Landing extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
            <LoginFormClass/>
            </div>
        )
    }
}