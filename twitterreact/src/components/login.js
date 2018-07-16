import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { instanceOf } from 'prop-types';
import Cookies from 'universal-cookie';
import './reqcss.css'
class LoginBut extends Component{

    state = {
        buttonName : 'Login',
        username : "" ,
        password: "",
        token:""
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

    submit=(e) => {
        e.preventDefault();
        const {username,password}=this.state;
        var formData  = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        const requestbody= `{
            "username":"`+username+`",
            "password":"`+password+`"
            }`
        fetch("http://127.0.0.1:8000/twitter/login/",{
        method: 'post',
        body: requestbody,
        headers : {'Content-type': "application/json"},
        }).then(response=>{console.log(response); return response.json()
        }).then(myJson=>{
            if ('token' in myJson){
                    var cookies = new Cookies()
                  const hash=Buffer.from(`${username}:${password}`).toString('base64')
                  cookies.set('token', hash, { path: '/'});
this.setState({token:hash})
            this.props.history.push('/post/'+this.state.token)

        }})

            console.log(requestbody+'jere')

    }
    gotosignup=(e) => {

    }
    render(){
        return(
            <div class="container">
  <div class="form">
    <form class="login-form">
    <h1>login here</h1>
      <input class="login_text" type="text" onChange={this.saveUsername} placeholder="username"/>
      <input class="login_text" type="password" onChange={this.savePassword} placeholder="password"/>
      <button class="login" onClick={this.submit.bind(this)} type="submit">login</button>
      <br/>
      <br/>
      <button class="register" onClick={()=>this.props.history.push('/signup')}>Sign up here</button>
    </form>
  </div>
</div>


        )
    }
    }
    export default LoginBut;