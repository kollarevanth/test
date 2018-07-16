import React,{ Component } from "react"
import Select from 'react-select';

class Users extends Component{
state={
user:[],
options:[],
selectedOption:""
}

componentWillMount()
{


fetch('http://127.0.0.1:8000/twitter/getUsers',
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
}
)
var i;

for(i=0;i<this.state.user.length;i++){
    this.setState({options:this.state.options.concat({label:this.state.user[i].username,value:this.state.user[i].id})})
}
}


  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`);
    }
  }




render()
{
const { selectedOption } = this.state;
return(
      <Select
      id="state-select"
					onBlurResetsInput={false}
					onSelectResetsInput={false}
					autoFocus
					simpleValue
					name="selected-state"
        placeholder="Enter user"
        value={selectedOption}
        onChange={this.handleChange}
        options={this.state.options}
      />

)

}
}
export default Users