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

  return (
    <CountryInfo
      name={name}
      hasShowOffSplashScreen={props.hasShowOffSplashScreen}
      setVisibilitySplashScreen={props.setVisibilitySplashScreen}
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
    };

    this.setIsTimeOutSplashScreenState = this.setIsTimeOutSplashScreenState.bind(
      this
    );
    this.setIsLoadingDataDoneState = this.setIsLoadingDataDoneState.bind(this);
    this.setVisibilitySplashScreen = this.setVisibilitySplashScreen.bind(this);
  }

  setIsTimeOutSplashScreenState() {
    this.setState({
      isTimeOutSplashScreen: true,
    });
    this.setVisibilitySplashScreen();
  }

  setIsLoadingDataDoneState() {
    this.setState({
      isLoadingDataDone: true,
    });
    this.setVisibilitySplashScreen();
  }

  setVisibilitySplashScreen() {
    this.setState({
      hasShowOffSplashScreen: true,
    });
  }

  render() {
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
              <HandleOffline />
              <Switch>
                <Route exact path="/">
                  <CountryInfo
                    name="Vietnam"
                    hasShowOffSplashScreen={this.state.hasShowOffSplashScreen}
                    setVisibilitySplashScreen={this.setVisibilitySplashScreen}
                  />
                </Route>
                {/* <Route path="/country/:name" component={CountryInfo}></Route> */}
                <Route path="/country/:name">
                  <RenderCountryInfo
                    hasShowOffSplashScreen={this.state.hasShowOffSplashScreen}
                    setVisibilitySplashScreen={this.setVisibilitySplashScreen}
                  />
                </Route>
                <Route path="/world">
                  <Dashboard
                    hasShowOffSplashScreen={this.state.hasShowOffSplashScreen}
                    setVisibilitySplashScreen={this.setVisibilitySplashScreen}
                  />
                </Route>
                <Route path="/profile">
                  <Profile
                    hasShowOffSplashScreen={this.state.hasShowOffSplashScreen}
                    setVisibilitySplashScreen={this.setVisibilitySplashScreen}
                  />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
