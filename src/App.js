import React from "react";
import SideBar from "./features/sideBar/SideBar";
import Dashboard from "./features/dashboard/Dashboard";
import CountryInfo from "./features/countryItem/CountryInfo";
import Profile from "./features/profile/Profile";
// import SplashScreen from "./features/splashScreen/SplashScreen";
import HandleOffline from "./features/handleOffline/HandleOffline";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

function RenderCountryInfo(props) {
  let { name } = useParams();
  console.log("name props: ", name);
  return (
    <CountryInfo
      name={name}
      hasShowOffSplashScreen={props.hasShowOffSplashScreen}
      setVisibilitySplashScreen={props.setVisibilitySplashScreen}
      setItemSideBarChoosen={props.setItemSideBarChoosen}
    />
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasShowOffSplashScreen: false,
      isTimeOutSplashScreen: false,
      isLoadingDataDone: false,
      itemSideBarChoosen: ''
    };

    console.log("constructor test abc");
    this.setVisibilitySplashScreen = this.setVisibilitySplashScreen.bind(this);
    this.setItemSideBarChoosen = this.setItemSideBarChoosen.bind(this);
  }

  setVisibilitySplashScreen() {
    this.setState({
      hasShowOffSplashScreen: true,
    });
  }

  setItemSideBarChoosen(item) {
    this.setState({
      itemSideBarChoosen: item
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
              <HandleOffline />
              <Switch>
                <Route exact path="/">
                  <CountryInfo
                    name="Vietnam"
                    hasShowOffSplashScreen={this.state.hasShowOffSplashScreen}
                    setVisibilitySplashScreen={this.setVisibilitySplashScreen}
                    setItemSideBarChoosen={this.setItemSideBarChoosen}
                  />
                </Route>
                <Route path="/country/:name">
                  <RenderCountryInfo
                    hasShowOffSplashScreen={this.state.hasShowOffSplashScreen}
                    setVisibilitySplashScreen={this.setVisibilitySplashScreen}
                    setItemSideBarChoosen={this.setItemSideBarChoosen}
                  />
                </Route>
                <Route path="/world">
                  <Dashboard
                    hasShowOffSplashScreen={this.state.hasShowOffSplashScreen}
                    setVisibilitySplashScreen={this.setVisibilitySplashScreen}
                    setItemSideBarChoosen={this.setItemSideBarChoosen}
                  />
                </Route>
                <Route path="/profile">
                  <Profile
                    hasShowOffSplashScreen={this.state.hasShowOffSplashScreen}
                    setVisibilitySplashScreen={this.setVisibilitySplashScreen}
                    setItemSideBarChoosen={this.setItemSideBarChoosen}
                  />
                </Route>
              </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
