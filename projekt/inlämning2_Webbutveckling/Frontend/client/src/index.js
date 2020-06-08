import React from "react";


import { render } from "react-dom";
import "./App.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      subbed: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange= (e)=> {
    this.setState({[e.target.name]: e.target.value})
    
  }
  handleSubmit= e => {
    e.preventDefault()
    console.log(this.state)
    
    const { username, password, subbed } = this.state;
    const data = {username: username, password:password, subbed:subbed}
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
    const { email, password, subbed } = this.state;
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
          <label>Vill du ta del av vårt nyhetsbrev?</label>
          <input
            name="subbed"
            type="checkbox"
            checked={subbed}
            onChange={this.handleInputChange}
          />
          <br />
          <input type="submit"></input>
        </form>
      </header>
    );
  }
}

render(<Register />, document.getElementById("root"));