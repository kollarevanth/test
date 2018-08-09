import React,{ Component } from "react"
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import reactElementToJSXString from 'react-element-to-jsx-string';
import { browserHistory } from 'react-router';
import Cookies from 'universal-cookie';
class getfollowing extends Component
{
state={
show:[],
posts:[],
comments:[],
replys:[]
}

componentWillMount()
{


fetch('http://kollarevanth.pythonanywhere.com/twitter/getFollowing',
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
}



showProfile=(uid,e)=>
{
this.props.history.push("/getSpecificUser/"+uid.toString()+'/'+this.props.match.params.tokens)


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
                <table >
                    <tbody>
                    {this.state.posts.map(item => (
                       <div>

                        <tr key={item.id}>
                            <td align="centre"><img src={process.env.PUBLIC_URL+"/"+item.pic.split("/").slice(8,).join('/')} height="80" width="80"/></td>
                            <td>{item.name}</td>
                            <td><button onClick={()=>this.showProfile(item.id)}>ShowProfile</button></td>
                         </tr>
                        </div>

                    ))}
                    </tbody>

                </table>
        </React.Fragment>)
        console.log(x)
        return x
        }
else{
this.props.history.push('/login')
}
}


}
export default getfollowing