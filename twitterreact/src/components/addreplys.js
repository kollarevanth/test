import React,{ Component } from "react"
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import reactElementToJSXString from 'react-element-to-jsx-string';
import { browserHistory } from 'react-router';

import Cookies from 'universal-cookie';
class addreply extends Component
{
    state={
    post:[],
    comments:[],
    reply:''
    }


    componentWillMount()
    {
    console.log('http://127.0.0.1:8000/twitter/getPost/'+this.props.match.params.postid)
    fetch('http://127.0.0.1:8000/twitter/getPost/'+this.props.match.params.postid).then(response=>response.json())
    .then(responseJson=>{
    this.setState({post:responseJson})
    })
    console.log('http://127.0.0.1:8000/twitter/getcomment/'+this.props.match.params.commentid)
    fetch('http://127.0.0.1:8000/twitter/getcomment/'+this.props.match.params.commentid).then(response=>response.json())
    .then(responseJson=>{
    this.setState({comments:responseJson})
    })

    }

    reply=(event)=>
    {
    const {target :{value}} = event;
    this.setState({reply:value})
    console.log(this.state.reply)
    }
    navigate=()=>
    {
    this.props.history.push('/post/'+this.props.match.params.tokens)
    }
    Submit=(event)=>
    {
    console.log(this.state.comments)
    fetch('http://127.0.0.1:8000/twitter/addreply/'+this.props.match.params.commentid,{
    method:'POST',
    headers: { 'Content-Type': 'application/json' ,'Authorization': `Basic ${this.props.match.params.tokens}`},
    body:JSON.stringify({reply:this.state.reply})
    }).
    then(response=>response.json()).catch(e=>{console.log(e)})
    window.alert("You replyed to a comment")
    this.navigate()
    }


    render()
    {
                var cookie=new Cookies()
            if(cookie.get('token')){
    return(
    <React.Fragment>
    <p align="right"><button class="more" onClick={()=>this.logout()}>LOGOUT</button></p>
                <Link class="more" to={"/post/"+this.props.match.params.tokens}>Home &emsp;</Link>
    <div align="center">
        <table >
                    <tbody>
                    {this.state.post.map(item => (
                       <div>

                        <tr key={item.id}>
                            <td align="centre"><img src={process.env.PUBLIC_URL+"/"+item.post.split("/").slice(8,).join('/')} height="502" width="502"/></td>
                         </tr>
                         <tr>
                            <td>{this.state.comments.comment}</td>
                         </tr>
                        </div>
                    ))}
                    </tbody>
                </table>
        <table >
                    <tbody>
                    {this.state.comments.map(item => (
                       <div>

                        <tr key={item.id}>
                            <td align="centre"><h3>{item.comment}</h3></td>
                         </tr>
                        </div>
                    ))}


         <tr><td>
        <form onSubmit={this.Submit}>
            <input class="login_text" onChange={this.reply}></input>
            <button class="login" >Submit</button>
            </form>
                        </td></tr>        </tbody>
                </table>
                </div>
    </React.Fragment>


    )
    }
else{
this.props.history.push('/login')
}

    }



}
export default addreply