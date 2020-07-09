import React from "react";
import Dashboard from "./features/dashboard/Dashboard";
import CountryInfo from "./features/countryItem/CountryInfo";
import Profile from "./features/profile/Profile";
import Login from "./features/login/Login";
import { UserContext } from "./features/login/user-context";
import HandleOffline from "./features/handleOffline/HandleOffline";
import firebase from "./features/profile/firebase";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

function RenderCountryInfo(props) {
  let { name } = useParams();
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
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      hasShowOffSplashScreen: false,
      isTimeOutSplashScreen: false,
      isLoadingDataDone: false,
      itemSideBarChoosen: "",
      authentication: { isLogin: false, email: null, id: null },
    };

    this.setVisibilitySplashScreen = this.setVisibilitySplashScreen.bind(this);
    this.setItemSideBarChoosen = this.setItemSideBarChoosen.bind(this);
  }

  checkLogin = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log("this user in checklogin: ", user.email);
        this.context.login(user.email, user.uid);
        
        this.setState({
          authentication: { ...this.context.authentication },
        });
      }
    });
  };

  componentDidUpdate() {
    console.log("didupdate app:",this.state.authentication);
  }

  setVisibilitySplashScreen() {
    this.setState({
      hasShowOffSplashScreen: true,
    });
  }

  setItemSideBarChoosen(item) {
    this.setState({
      itemSideBarChoosen: item,
    });
  }

  componentDidMount() {
    this.checkLogin();
  }

  login = (email, id) => {
    console.log("login in app: ");

    const {authentication} = this.state;

    this.setState({
      authentication: {
        isLogin: true, 
        email,
        id
      }
    })
    

    console.log("this.state.authentication afther login: ", this.state.authentication);
  }

  logout = async () => {
    await firebase.auth().signOut().catch(function(error) {
    });
    this.setState({
      authentication: {
        isLogin: false, 
        email: null,
        id: null
      }
    })
  }

  render() {
    console.log("this.state.authentication: ", this.state.authentication);
    return (
      <UserContext.Provider
        value={{
          authentication: this.state.authentication,
          logout: this.logout,
          login: this.login,
        }}
      >
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
                />{" "}
              </Route>{" "}
              <Route path="/country/:name">
                <RenderCountryInfo
                  hasShowOffSplashScreen={this.state.hasShowOffSplashScreen}
                  setVisibilitySplashScreen={this.setVisibilitySplashScreen}
                  setItemSideBarChoosen={this.setItemSideBarChoosen}
                />{" "}
              </Route>{" "}
              <Route path="/world">
                <Dashboard
                  hasShowOffSplashScreen={this.state.hasShowOffSplashScreen}
                  setVisibilitySplashScreen={this.setVisibilitySplashScreen}
                  setItemSideBarChoosen={this.setItemSideBarChoosen}
                />{" "}
              </Route>{" "}
              <Route path="/profile">
                <Profile
                  hasShowOffSplashScreen={this.state.hasShowOffSplashScreen}
                  setVisibilitySplashScreen={this.setVisibilitySplashScreen}
                  setItemSideBarChoosen={this.setItemSideBarChoosen}
                />{" "}
              </Route>{" "}
              <Route path="/login">
                <Login />
              </Route>{" "}
            </Switch>{" "}
          </Router>{" "}
        </div>
      </UserContext.Provider>
    );
  }
}
//App.contextType = UserContext;
export default App;
