import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './App.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      subbed: true
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'subbed' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
  handleSubmit(event){
    const {email, password, subbed}=this.state;
    fetch("localhost:1000/reg", {
      method:'POST',
      headers:{
        'Content-type': 'application/json'
      }, 
      body: JSON.stringify(this.state)
    })
    .then((response)=>response.json())
    .then((result)=> {
      console.log(result)
    })
  }


render(){
  
  const {email, password, subbed}=this.state;
  return(
    <header className="App-header">
        <form method="POST">

        <label>E-post:</label><br/><input name="email" type="text" value={this.state.email}onChange={this.handleInputChange}/><br/>
        <label>Lösenord</label><br/><input name="password" type="password" value={this.state.password}onChange={this.handleInputChange}/><br/>
        <label>Vill du ta del av vårt nyhetsbrev?</label><input name="subbed" id="sub" type="checkbox" checked={this.state.subbed} onChange={this.handleInputChange}/><br/>
        <input id="submit" type="submit"></input>
        </form></header>
  );
}
}

ReactDOM.render(

    <Register />
,
  document.getElementById('root')
  );
  

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();