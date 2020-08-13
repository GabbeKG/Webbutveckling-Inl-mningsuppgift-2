import React from "react";
import {withRouter, Link, Redirect, useHistory, Route, Switch} from 'react-router-dom';
import Index from "./index";
import { render } from "react-dom";
import IsLoggedIn from "./LoggedInPage";
import "./App.css";
import history from "./History";


export class UserLogin extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
            
      
      
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
  }
  handleInputChange= (e)=> {
    this.setState({[e.target.name]: e.target.value})
    
  }
  
  handleSubmit= (e) => {
    
    e.preventDefault()
    console.log(this.state);
    const { username, password} = this.state;
    const data = {username: username, password:password}
    
    
    fetch('http://localhost:3001/Login', {
          method: 'POST',
          mode:'cors',
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json"
          }  
        })
        .then(function(res){
          return res.json()}).then(function(resjson){
            
            if (resjson){
              console.log(resjson);
              history.push({pathname:'/myAccount/'+username, state:{username: username}});
              return window.location.reload();
            }
            if(resjson==false){
              console.log(resjson);
            }
          })
           
        }
      
       // console.log(password)
        
          
      

render() {
    const { email, password } = this.state;
    
    return (
      <header className="App-header">
      
        <form onSubmit={this.handleSubmit} method="POST">
          <label>E-post:</label>
          <br />
          <input
            name="username"
            type="text"
            value={email}
            onChange={this.handleInputChange}
          />
          <br />
          <label>Lösenord</label>
          <br />
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleInputChange}
          />
          <br />
          <br />
          <input value="Logga in" type="submit"></input>
        </form>
        <br/>
        

        Har du inget konto?<Link to='/Register'>Klicka här!</Link>
        
        
        
      </header>
    );
  }

}

export default withRouter(UserLogin) ;