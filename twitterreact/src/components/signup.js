import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
 class SignUp extends Component{
    state = {
        // buttonName : 'Login',
        username : "" ,
        password: "",
        email:""
    }
    saveUsername = (event) => {
        const {target : {value}}  = event;
        this.setState({
            username : value
        })
    }

    savePassword = (event) => {
        const {target : {value}} = event;
        this.setState({
            password : value
        })
    }
    saveEmail = (event) => {
        const {target : {value}} = event;
        this.setState({
            email : value
        })
    }
    submit=(e) => {
        e.preventDefault();
        const {username,password,email}=this.state;
        const requestbody= `{
            "username":"`+username+`",
            "password":"`+password+`",
            "email":"`+email+`"
            }`
        fetch("http://localhost:8000/twitter/signupview/",
        {
        method:'post',
        mode:'no-cors',
         headers : {'Access-Control-Allow-Origin':'*'},

        body:requestbody

        }).then(res=>{console.log(res); return res.json()})
        window.alert("user created successfully")
        this.props.history.push('/login')
        }

 render(){
    return(
        <div class="container">
<div class="form">
<form class="register-form">
<h1>Sign Up here</h1>
  <input class="login_text" type="text" onChange={this.saveUsername} placeholder="name"/>
  <input class="login_text" type="password"onChange={this.savePassword}  placeholder="password"/>
  <input class="login_text" type="text" onChange={this.saveEmail} placeholder="email address"/>
  <button class="login" onClick={this.submit}>create</button>
  <br/>
  <br/>
  <button  class="login" onClick={()=>this.props.history.push('/login')} >Login here</button>
</form>
</div>
</div>
    )
}
 }
 export default SignUp;