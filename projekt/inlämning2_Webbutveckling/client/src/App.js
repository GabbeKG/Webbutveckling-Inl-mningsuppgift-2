import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";

import userLogin from "./Login.js";
import Register from "./index.js";
import './App.css';
class Register extends Component{
  constructor(props){
    super(props);

    this.state ={
      
    }
  }
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={userLogin}></Route>
        </Switch>
        </BrowserRouter>
        <userLogin />
        <form>

        <label>E-post</label><br/><input id="mail" type="text"></input><br/>
        <label>Lösenord</label><br/><input id="pw" type="password"></input><br/>
        <label>Vill du ta del av vårt nyhetsbrev?</label><input id="sub" type="checkbox"></input><br/>
        <input id="submit" type="submit"></input>
        </form>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
