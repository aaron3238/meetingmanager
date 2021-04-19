import React, {Component} from "react";
import LoginForm from "../forms/LoginForm.js"
import RegisterForm from "../forms/RegisterForm.js"
import Styles from '../../Body.module.css';
import config from '../../config.json'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
export default class Landing extends Component{
    constructor(props){
        super(props);

        this.state = {
            status: null
        }
    }


    checkServerStatus(){
        axios.get(config.backendURL + '/test')
        .then(res=>{
            console.log(res.status)
            if(res.status==200){
                this.setState({status: res.status})
            }else{
                this.setState({status: 404})
            }
        })
    }
    componentWillMount(){
        this.checkServerStatus();
    }

    render(){
        let connectionAlert;
        console.log("status: " + this.state.status)
        if(this.state.status==200){
            connectionAlert = <><h2>Please register, or login.</h2>
            <RegisterForm setToken={this.props.setToken}/>
            {'  '}
            <LoginForm setToken={this.props.setToken}/>
            </>
        }else{
            connectionAlert = <Alert variant="danger">Error connecting to server</Alert>
        }

        return(
            <div style={{ padding: "1rem" }} className={Styles.App}>
            
            {connectionAlert}

            </div>
        )
    }
}