import React from "react";
import SideBar from "./features/sideBar/SideBar";
import Dashboard from "./features/dashboard/Dashboard";
import CountryInfo from "./features/countryItem/CountryInfo";
import Profile from "./features/profile/Profile";
import SplashScreen from "./features/splashScreen/SplashScreen";
import HandleOffline from "./features/handleOffline/HandleOffline";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      hasShowOffSplashScreen: false,
      isTimeOutSplashScreen: false,
      isLoadingDataDone: false
    }

    this.setIsTimeOutSplashScreenState = this.setIsTimeOutSplashScreenState.bind(this);
    this.setIsLoadingDataDoneState = this.setIsLoadingDataDoneState.bind(this);
    this.setVisibilitySplashScreen = this.setVisibilitySplashScreen.bind(this);
  }

  setIsTimeOutSplashScreenState(){
    this.setState({
      isTimeOutSplashScreen: true
    })
    this.setVisibilitySplashScreen()
  }

  setIsLoadingDataDoneState(){
   
    this.setState({
      isLoadingDataDone: true
    })
    this.setVisibilitySplashScreen()
  }

  setVisibilitySplashScreen() {
    // console.log("isTimeOutSplashScreen: ", this.isTimeOutSplashScreen)
    // if(this.state.isLoadingDataDone && this.isTimeOutSplashScreen) {
    if(this.state.isTimeOutSplashScreen) {
      this.setState({
        hasShowOffSplashScreen: true
      })
    }
  }

  render() {
    console.log("hasShowOffSplashScreen: ", this.state.hasShowOffSplashScreen)
    if(!this.state.hasShowOffSplashScreen) {
      return (<SplashScreen setIsTimeOutSplashScreenState={this.setIsTimeOutSplashScreenState}/>);
    }

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
                  <CountryInfo name="Vietnam" />
                </Route>
                <Route path="/country/:name" component={CountryInfo}></Route>
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
}

export default App;
