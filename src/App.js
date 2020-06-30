import React from 'react';
import SideBar from "./features/sideBar/SideBar";
import Dashboard from "./features/dashboard/Dashboard";
import CountryInfo from "./features/countryItem/CountryInfo";
import Profile from "./features/profile/Profile";
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
        <div className="content">
        <Switch>
          <Route exact path="/">
            <CountryInfo name='Vietnam'/>
          </Route>
          <Route path="/country/:name" component={CountryInfo}>
          </Route>
          <Route path="/world">
            <Dashboard />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
        </div>
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

// function Dashboard() {
//   return (
//     <div>
//       <h2>Dashboard</h2>
//     </div>
//   );
// }

export default App;
