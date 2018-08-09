import React,{ Component } from "react"
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import reactElementToJSXString from 'react-element-to-jsx-string';
import { browserHistory } from 'react-router';
import Cookies from 'universal-cookie';
class specificUser extends Component
{
state={
show:[],
posts:[],
comments:[],
pic:[],
replys:[],
flag:0
}

componentWillMount()
{


fetch('http://kollarevanth.pythonanywhere.com/twitter/specificuserposts/'+this.props.match.params.uid,
   {
        headers:{
        'Authorization': `Basic ${this.props.match.params.tokens}`
        }
        }
).
then(response=>response.json()).
then(responseJson=>
{
this.setState({posts:responseJson})
}
)

fetch('http://kollarevanth.pythonanywhere.com/twitter/getdp/'+this.props.match.params.uid,
   {
        headers:{
        'Authorization': `Basic ${this.props.match.params.tokens}`
        }
        }
).
then(response=>response.json()).
then(responseJson=>
{
this.setState({pic:responseJson})
}
)


}

getReply=(id)=>
{
var url='http://kollarevanth.pythonanywhere.com/twitter/replys/'+id.slice(1,)
console.log(url)
if(id[0]!='r')
    return
var x=async()=>{await fetch(url).
then(response=>response.json()).then(responseJson=>{
this.setState({replys:responseJson});
})
return id
}
x().then(id=>{
this.state.replys= (
<table>
    {this.state.replys.map(item=>(
    <div>
        <tr>
            <td>{item.reply}</td>
        </tr>

    </div>
    ))}
    </table>

    )
    ReactDOM.render(this.state.replys,document.getElementById(id))
    }
     )
}






getComments(id)
{
var url='http://kollarevanth.pythonanywhere.com/twitter/comments/'+id.toString()
var x=async()=>{await fetch(url).
then(response=>response.json()).then(responseJson=>{
this.setState({comments:responseJson});
})
return id
}
x().then(id=>{
var replyid="r"+id.toString()
this.state.comments= (
<React.Fragment>
<div>
<table>
    {this.state.comments.map(item=>(
        <div>
        <tr>
            <td>{item.comment}</td>
            <td><button onClick={()=>this.clickFunction('r'+item.id)}>reply</button></td>
        </tr>
        <tr>
            <td><div id={'r'+item.id}></div></td>
        </tr>
        <tr>
            <td><button onClick={()=>this.clickFunction('/'+id+'/'+item.id)}>addreply</button></td>
        </tr>
        </div>

    ))}
    </table>
    </div>
    </React.Fragment>
    );
    console.log(reactElementToJSXString(this.state.comments))
    ReactDOM.render(this.state.comments,document.getElementById(id))
    }
     )
}




alter=(id)=>{
this.state.show[id]=1-this.state.show[id];
this.getComments(id);
console.log(id)
console.log(this.state.show[id])

}

clickFunction=(id,e)=>{
if(id[0]=='r'){
    this.getReply(id);
    }
else if(id[0]=='/')
{
    this.props.history.push("addreplys"+id+'/'+this.props.match.params.tokens)
}
else{
    this.alter(id)
    }

}
addFollowing=()=>
{


fetch('http://kollarevanth.pythonanywhere.com/twitter/getFollowing',{
 headers: {'Authorization': `Basic ${this.props.match.params.tokens}`}}).then(response=>response.json()).then(responseJson=>{
var i;
var x=parseInt(this.props.match.params.uid)
for(i=0;i<responseJson.length;i++)
{
if(responseJson[i].user_id==x)
{
this.setState({flag:1})
}
}
if(this.state.flag==0)
{
fetch('http://kollarevanth.pythonanywhere.com/twitter/addfollowing',{
    method:'POST',
    headers: { 'Content-Type': 'application/json' ,'Authorization': `Basic ${this.props.match.params.tokens}`},
    body:JSON.stringify({following_id:this.props.match.params.uid})
    }).
    then(response=>response.json()).catch(e=>{console.log(e)})
}
else
{
window.alert("You are have been following")
}
}
)
}

likeFunction=(id,e)=>{
if(document.getElementById('l'+id.toString()).innerHTML=='Like')
{
fetch('http://kollarevanth.pythonanywhere.com/twitter/likepost/'+id.toString(),{
method:'PUT',
headers:{'Authorization':`Basic ${this.props.match.params.tokens}`}
}
).then(response=>{
document.getElementById('li'+id.toString()).innerHTML=parseInt(document.getElementById('li'+id.toString()).innerHTML)+1;
document.getElementById('l'+id.toString()).innerHTML='UNLIKE'
})
}
else
{
fetch('http://kollarevanth.pythonanywhere.com/twitter/unlikepost/'+id.toString(),{
method:'PUT',
headers:{'Authorization':`Basic ${this.props.match.params.tokens}`}
}
).then(response=>{
document.getElementById('li'+id.toString()).innerHTML=parseInt(document.getElementById('li'+id.toString()).innerHTML)-1;
document.getElementById('l'+id.toString()).innerHTML='Like'
})

}
}
logout=()=>{
var cookie=new Cookies()
cookie.remove('token',{ path: '/'})
this.props.history.push("/login")
}


render()
{
            var cookie=new Cookies()
            if(cookie.get('token')){
           var x=( <React.Fragment>
           <p align="right"><button class="more" onClick={()=>this.logout()}>LOGOUT</button></p>
                <Link class="more" to={"/post/"+this.props.match.params.tokens}>Home &emsp;</Link>
                <Link class="more" to={"/getfollowing/"+this.props.match.params.tokens}>YOUR Following List&emsp;</Link>
                <Link class="more" to={"/getfollowers/"+this.props.match.params.tokens}>YOUR Followers List</Link><br/>

                {this.state.pic.map(item => (
                <img class="profileimage" src={"/static/bundles"+"/"+item.post.split("/").slice(10,).join('/')} height="502" width="502"/>))
                }
                <br/><br/><br/><br/><br/>
                <button class="more" id="follow" onClick={()=>this.addFollowing()}>FOLLOW</button>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                {this.state.posts.map(item => (
                       <div class="postinfo" align="center">
                       {item.name+":posted in this timeline"}
                            <td ><img class="postinfo" src={"/static/bundles"+"/"+item.post.split("/").slice(10,).join('/')} height="502" width="502"/></td><br/>
                         <td><div id={'li'+item.id}>{item.likes}</div></td>
                            <td>likes</td>
                            <td> </td><br/>
                            <td><button class="more" id={'l'+item.id} onClick={()=>this.likeFunction(item.id)} >Like</button></td>
                        <td><button class="more" onClick={() => this.clickFunction(item.id)}>Viewcomments</button></td>
                        <td><button class="more" onClick={() => this.shareFunction(item.post.substr(48))}>share</button></td>

                            <td><button class="more"><Link to={"/addcomments/"+item.id+'/'+this.props.match.params.tokens}>addComment</Link></button></td><br/>
                            <td><div id={item.id}></div></td>
                        </div>

                    ))}
        </React.Fragment>)
        console.log(x)
        return x
        }
else{
return(
<React.Fragment>
this.props.history.push('/login')
</React.Fragment>
)
}
}


}
export default specificUser