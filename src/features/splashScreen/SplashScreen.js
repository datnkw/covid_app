import React from "react";
import styles from "./SplashScreen.module.css";

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasShowUp: false,
    };
  }

  componentDidMount() {
    setTimeout(
      () => {
        this.props.setIsTimeOutSplashScreenState();
      }, 3000
    )
  }

  // componentWillUnmount() {
  //   this.setState({hasShowUp: true})
  // }

  render() {
    // if (!this.hasShowUp) {
      return (
        <div className={styles.splashWrapper}>
          <div className={styles.logo}></div>
          <p>Get the latest information about Covid 19</p>
        </div>
      );
    }
  
}

export default Loading;
