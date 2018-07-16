import React,{ Component } from "react"
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import PostsComponent from './postsComponent.js'
import addcomments from './addcomments.js'
import addreply from './addreplys.js'
import login from './login.js'
import addpost from './addpost.js'
import signup from './signup.js'
import timeline from './timeline.js'
import addprofilepic from './addprofilepic.js'
import getfollowing from './getfollowing.js'
import getfollowers from './getfollowers.js'
import specificUser from './getUserDetails.js'
class Routes extends Component
{
state={
value:'',
token:'',

}

componentWillMount()
{
var username="revanth";
var password="revanth32"
const hash=Buffer.from(`${username}:${password}`).toString('base64')
this.setState({token:hash})

}

render()
{
    return(
    <div>
    <React.Fragment>
    <Router>
    <div>
    <Route exact path="/login" component={login}/>
    <Route exact path="/addpost/:tokens" component={addpost}/>
    <Route exact path="/post/:tokens" render={props=><PostsComponent{...props} token={this.state.token}/>}/>
    <Route exact path="/timeline/:tokens" component={timeline}/>
    <Route exact path='/post/addreplys/:postid/:commentid/:tokens' component={addreply}/>
    <Route exact path='/getSpecificUser/:init/addreplys/:postid/:commentid/:tokens' component={addreply}/>

    <Route exact path='/timeline/addreplys/:postid/:commentid/:tokens' component={addreply}/>
    <Route exact path="/addcomments/:postid/:tokens" component={addcomments}/>
    <Route exact path="/signup" component={signup}/>
    <Route exact path="/addProfilePic/:tokens" component={addprofilepic}/>
    <Route exact path="/getfollowing/:tokens" component={getfollowing}/>
    <Route exact path="/getfollowers/:tokens" component={getfollowers}/>
    <Route exact path="/getSpecificUser/:uid/:tokens" component={specificUser}/>
    </div>
    </Router>
    </React.Fragment>
    </div>
    );
}

}
export default Routes