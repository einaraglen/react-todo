import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  /*useParams*/
} from "react-router-dom";

import home from "./images/home.svg";
import about from "./images/information.svg";
import settings from "./images/gear.svg";

import Board from "./components/Board/Board"

const App = () => {

  const data = [
    {
      title: "Clean", 
      state: 0,
      description: "Clean kitchen"
    },
    {
      title: "Eat", 
      state: 0,
      description: "Eat sum"
    },
    {
      title: "Program", 
      state: 1,
      description: "Make App"
    },
  ]

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
                <Board data={data}/>
              </Route>
              <Route path="/about">
                About
              </Route>
              <Route path="/settings">
                Settings
              </Route>
            </Switch>
      </div>
    </Router>
  )
}

export default App;
