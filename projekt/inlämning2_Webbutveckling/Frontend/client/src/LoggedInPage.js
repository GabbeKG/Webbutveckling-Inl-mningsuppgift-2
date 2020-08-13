import React from "react";
import { render } from "react-dom";
import Index from "./index";
import { withRouter,Router } from "react-router-dom";
import "./App.css";

export class IsLoggedIn extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            subbed: true,
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount(){
        
        let { username, subbed, status } = this.state;
        let data = {username: username, subbed: subbed, status: status}
        Promise.all([
            fetch('http://localhost:3001/user'),fetch('http://localhost:3001/userInfo') 
            
        ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => this.setState({
            username: data1.username, 
            subbed: data2.subbed
        },console.log(data2.subbed)))
        
        
        
        
    }
    handleSubmit= e => {
        e.preventDefault()
        console.log(this.state)
        
        const { username, subbed } = this.state;
        const data = {username: username, subbed:subbed}
        fetch('http://localhost:3001/userupdate', {
              method: 'POST',
              mode:'cors',
              body: JSON.stringify(data),
              headers: {
                "Content-type": "application/json"
              }
              
            })
            console.log(username)
            
            console.log(subbed)
              
          }
          handleInputChange= (e)=> {
            this.setState({[e.target.name]: e.target.value})
            
          }
    handleChange(){
        
        this.setState({subbed: !this.state.subbed})
            
          }

    render(){
        const { username, subbed, status } = this.state;
        return(
            <header className="App-header">
            hej {username}.<br/> Prenumerations status: {String(subbed)}
            <div>
                <br/>
                <form onSubmit={this.handleSubmit} method="POST">
                <label>Ändra prenumerations status?</label>
                <input
            name="subbed"
            type="checkbox"
            value={subbed}
            
            onChange={this.handleChange}
          />
          <br/>
          <br/><input type="submit" value="Bekräfta"></input>
                </form>
            </div>
            
            </header>
        

        )
    }
}
export default withRouter(IsLoggedIn);