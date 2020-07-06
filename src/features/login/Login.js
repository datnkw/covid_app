import React from "react";
import styles from "./Login.module.css";
import styleSplashScreen from "../splashScreen/SplashScreen.module.css";
import className from "classnames";
import firebase from "../profile/firebase";
import {UserContext} from './user-context';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }
  
  static contextType = UserContext;

  handleChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  async login(event) {
    event.preventDefault();

    const {email, password} = this.state;

    console.log("email: ", email);
    console.log("password: ", password);

    console.log("firebase: ", firebase);

    const result = await firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });

    const thisClassPresent = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("login success:", {user});
        console.log("this usercontext: ",thisClassPresent.context);
        thisClassPresent.context.login(user.email);
        console.log("email login: ",thisClassPresent.context.user.email);
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
    return result;
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={className(styleSplashScreen.logo, styles.logo)}></div>
        <form onSubmit={this.login} method="post">
          <div className={styles.inputWrapper}>
            <p>email:</p>
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className={styles.inputWrapper}>
            <p>password:</p>
            <input
              name="password"
              type="text"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <input className={styles.submit} type="submit" value="Login" />
        </form>
      </div>
    );
  }
}
//Login.contextType = UserContext;
export default Login;
