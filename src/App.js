import React from 'react';
import SideBar from "./features/sideBar/SideBar";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

function App() {
  return (
    <div className="App">
       <Router>
      <div className="App">

        <SideBar 
          itemSideBarInfoList={[
            {
              name: "Vietnam",
              to: "/",
            },
            {
              name: "Wolrd",
              to: "/world",
            },
            {
              name: "Profile",
              to: "/profile",
            },
          ]}
        />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/world">
            <About />
          </Route>
          <Route path="/profile">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

export default App;
