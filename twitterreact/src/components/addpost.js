import React,{ Component } from "react"
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import reactElementToJSXString from 'react-element-to-jsx-string';
import { browserHistory } from 'react-router';
import axios from 'axios'
import Cookies from 'universal-cookie';
class addpost extends Component
{
    state={
    post:[],
    image:''
    }

    imaging=(event)=>
    {
    event.preventDefault()
    const {target :{value}} = event;

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    if(month<10)
    {
        month='0'+month.toString()
    }
    if(date<10)
    {
        date='0'+date.toString()
    }
    }
        navigate=()=>
    {
    this.props.history.push('/post/'+this.props.match.params.tokens)
    }
    Submit=(e)=>{
    e.preventDefault()
var formData = new FormData();
var fileField = document.querySelector("input[type='file']");

formData.append("Post", fileField.files[0]);
formData.append("Likes",1000)
var z=formData.entries()
z=z.next()
  fetch('http://kollarevanth.pythonanywhere.com/twitter/addpost', {
    method: 'POST',
    headers: {
    'Authorization': `Basic ${this.props.match.params.tokens}`
    },
    body:formData
  }).then(
    response => {for (var key of formData.entries()) {
			console.log(key[0] + ', ' + key[1])
		}}
  ).catch(
    error => console.log(error)
  );

  window.alert("Your post has been sucessfully saved in your time line")
  this.navigate()
    }


    render()
    {
                var cookie=new Cookies()
            if(cookie.get('token')){
    return(
    <React.Fragment>
        <form onSubmit={this.Submit} enctype="multipart/form-data">
            <input type="file" id="img" onChange={this.imaging}></input>
            <button>Submit</button>
            </form>
    </React.Fragment>


    )
    }
else{
this.props.history.push('/login')
}

    }



}
export default addpost