import React,{ Component } from "react"
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import reactElementToJSXString from 'react-element-to-jsx-string';
import { browserHistory } from 'react-router';
import './reqcss.css'
import Select from 'react-select';
import Users from './autosuggestion.js'
import Cookies from 'universal-cookie';
import LoginBut from './login.js'
class PostsComponent extends Component
{
state={
show:[],
posts:[],
comments:[],
replys:[],
user:[],
options:[],
selectedOption:""
}

componentWillMount()
{


fetch('http://kollarevanth.pythonanywhere.com/twitter/posts',
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

fetch('http://kollarevanth.pythonanywhere.com/twitter/getUsers',
   {
        headers:{
        'Authorization': `Basic ${this.props.match.params.tokens}`
        }
        }
).
then(response=>response.json()).
then(responseJson=>
{
this.setState({user:responseJson})

var i;

for(i=0;i<this.state.user.length;i++){
    this.setState({options:this.state.options.concat({label:this.state.user[i].username,value:this.state.user[i].id})})
}
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
<div>
    {this.state.replys.map(item=>(
    <div>
          <td >&emsp;&emsp;{item.name+':'+item.reply}</td><br/>
     </div>
    ))}
    </div>
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
             <td class="line">{item.name+':'+item.comment}</td><br/>
            <td>&emsp;&emsp;&emsp;<div id={'r'+item.id}></div></td>
            <td><button class="more" onClick={()=>this.clickFunction('r'+item.id)}>viewreplys</button></td>
         <td><button class="more" onClick={()=>this.clickFunction('/'+id+'/'+item.id)}>addreply</button></td><br/>
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


shareFunction=(post,e)=>
{
    var formData = new FormData();
    formData.append("Post", post)
    fetch('http://kollarevanth.pythonanywhere.com/twitter/addpost', {
    method: 'POST',
    headers: {
    'Authorization': `Basic ${this.props.match.params.tokens}`
    },
    body:formData
  }).then(
    response => {
    console.log("success")
		}
  ).catch(
    error => console.log(error)
  );
  window.alert("Your post has been shared sucessfully saved in your time line")
}


  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      this.props.history.push("/getSpecificUser/"+selectedOption.toString()+'/'+this.props.match.params.tokens);
    }
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
    const { selectedOption } = this.state;
    var cookie=new Cookies()
    if(cookie.get('token')){
           var x=( <React.Fragment>
           <p align="right"><button class="more" onClick={()=>this.logout()}>LOGOUT</button></p>
                <Select

					onBlurResetsInput={false}
					onSelectResetsInput={false}
					autoFocus
					simpleValue

        placeholder="Search user"
        value={selectedOption}
        onChange={this.handleChange}
        options={this.state.options}
      />
                <button class="more"><Link to={"/addpost/"+this.props.match.params.tokens}>addpost</Link></button>
                <button class="more"><Link to={"/timeline/"+this.props.match.params.tokens}>timeline</Link></button>
                    {this.state.posts.map(item => (
                       <div class="postinfo" align="center">
                            {item.name+":posted in this timeline"}
                            <td ><img class="postinfo" src={process.env.PUBLIC_URL+"/"+item.post.split("/").slice(8,).join('/')} height="502" width="502"/></td><br/>
                            <td><div id={'li'+item.id}>{item.likes}</div></td>
                            <td>likes</td>
                            <td> </td><br/>
                        <td><button class="more" id={'l'+item.id} onClick={()=>this.likeFunction(item.id)} >Like</button></td>
                        <td><button class="more" onClick={() => this.clickFunction(item.id)}>View comment</button></td>
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
this.logout()
</React.Fragment>)

}


}
}
export default PostsComponent