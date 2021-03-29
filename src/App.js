import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import home from "./images/home.svg";
import about from "./images/information.svg";
import settings from "./images/gear.svg";
import Board from "./components/Board/Board";
import About from "./components/About/About";

const App = () => {

  return (
    <Router className="router">
      <div className="header">
              <Link className="link home" to="/">
                <div>
                  <p>Home</p>
                  <img src={home} alt="home icom" />
                </div>
              </Link>
              <Link className="link about" to="/about">
              <div>
                  <p>About</p>
                  <img src={about} alt="about icon" />
                </div>
              </Link>
              <Link className="link settings" to="/settings">
                <div>
                  <p>Settings</p>
                  <img src={settings} alt="settings icon"/>
                </div>
              </Link>
              <input className="search-input" placeholder="Search" type="text"/>
      </div>
      <div className="main">
            <Switch>
              <Route exact path="/">
                <Board />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/settings">
                Settings
              </Route>
              <Route path="*">
                <div className="not-found">404 Path was not found</div>
              </Route>
            </Switch>
      </div>
    </Router>
  )
}

export default App;