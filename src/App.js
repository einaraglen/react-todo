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

import Store, { Context } from "./Store";

//Kinda serializes your data, so that it persists between refreshes
//Uses JSON parsing so we can get back the object list we sendt into it
//And ofc we give it an empty array if no session data is found (this helps to not break absolutly erything)
function useStateWithLocalStorage(localStorageKey) {

  const [value, setValue] = React.useState(
    (localStorage.length !== 0) ? JSON.parse(localStorage.getItem(localStorageKey)) : []
  );
 
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [localStorageKey, value]);
 
  return [value, setValue];
}

const App = () => {
  //inits our session storage under key: data
  const [value, setValue] = useStateWithLocalStorage("data");
 
  return (
    <Store>
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
                <Board data={value} updateData={(data) => setValue(data)} />
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
    </Store>
  )
}

export default App;
