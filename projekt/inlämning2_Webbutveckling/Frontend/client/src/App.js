import React from 'react';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
