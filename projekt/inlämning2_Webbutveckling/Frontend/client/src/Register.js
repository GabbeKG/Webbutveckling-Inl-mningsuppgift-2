import React from "react";

import index from "./index.js"
import { render } from "react-dom";
import {withRouter, Link} from 'react-router-dom';
import "./App.css";

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email:"",
      password: "",
      subbed: props.subbed || false,
    };
    this.handleChange = this.handleChange.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(){
    this.setState({subbed: !this.state.subbed})
  }
  handleInputChange= (e)=> {
    this.setState({[e.target.name]: e.target.value})
    
  }
  handleSubmit= e => {
    e.preventDefault()
    console.log(this.state)
    
    const { username, email, password, subbed } = this.state;
    const data = {username: username, email:email, password:password, subbed:subbed}
    fetch('http://localhost:3001/reg', {
      method: 'POST',
      mode:'cors',
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json"
      }
      
    })
    console.log(username)
    console.log(password)
    console.log(subbed)
      
  }

  render() {
    const { username,email, password, subbed } = this.state;
    return (
      <header className="App-header">
       
        <form onSubmit={this.handleSubmit} method="POST">
          <label>Användarnamn:</label>
          <br />
          <input
            name="username"
            type="text"
            value={username}
            onChange={this.handleInputChange}
          />
          <br />
          <label>E-post:</label>
          <br/>
          <input
          name="email"
          type="email"
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
          <label>Vill du ta del av vårt nyhetsbrev?</label>
          <input
            name="subbed"
            type="checkbox"
            value={this.state.subbed}
            
            onChange={this.handleChange}
          />
          <br />
          <input type="submit"></input>
        </form>
        
        <br/>Har du redan ett konto? Logga in <Link to='/Login'>här!</Link>
      </header>
    );
  }
}

export default withRouter(Register);