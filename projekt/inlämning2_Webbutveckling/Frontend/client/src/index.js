import React from "react";

import Register from "./Register.js";
import { render } from "react-dom";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Component } from "react";
import UserLogin from "./Login.js";
import IsLoggedIn from "./LoggedInPage";
import history from "./History";



  const routes =(<Router history={History}>
       
        <Switch>
        <Route exact path="/" exact component={Register}/>
        <Route exact path="/Register" exact component={Register}/>
        <Route exact path="/Login" exact component={UserLogin}/>
        <Route path="/myAccount" component={IsLoggedIn}/>
        </Switch>
        
        
      
      </Router>);

  render(routes, document.getElementById("root"));

