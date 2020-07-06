import React from "react";
import styles from './Login.module.css'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username="",
      password=""
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
        <p>username:</p>
        <input 
          name="username"
          type="text"
          value={this.state.username}
        />
        </div>
        <div className={styles.inputWrapper}>
        <p>password:</p>
        <input 
          name="password"
          type="text"
          value={this.state.password}
        />
        </div>
      </div>
    );
  }
}

export default Loading;