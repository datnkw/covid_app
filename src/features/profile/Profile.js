import React from "react";
import styles from "./Profile.module.css";
import firebase from "./firebase";
import Loading from "../loading/Loading";
import SplashScreen from "../splashScreen/SplashScreen";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "123",
      lastName: "",
      email: "",
      location: "",
      healthStatus: "",
      isMeetingRelateCovid: "",
      loading: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.props.setItemSideBarChoosen('Profile');
  }

  handleChange(event) {
    const target = event.target;
    console.log("target: ", target);
    this.setState({
      [target.name]: [target.value],
    });
  }

  handleSubmit(event) {
    alert(
      "A name was submitted: " +
        this.state.firstName +
        " " +
        this.state.lastName
    );

    firebase.database().ref('profiles/' + this.profileID).set({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      location: this.state.location,
      healthStatus: this.state.healthStatus,
      isMeetingRelateCovid: this.state.isMeetingRelateCovid,
      username: 'admin2',
      password: 'admin'
    }, function(error) {
      if (error) {
        // The write failed...
        console.log("false");
      } else {
        // Data saved successfully!
        console.log("success");
      }
    });

    event.preventDefault();
  }

  setStateInfo(state) {
    this.setState({
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      location: state.location,
      healthStatus: state.healthStatus,
      isMeetingRelateCovid: state.isMeetingRelateCovid
    }
    )
  }

  componentDidMount() {
    const profileRef = firebase.database().ref('/profiles');

    profileRef.on('value', (snapshot) => {
      console.log("snapshot: ", snapshot);
      const profiles = snapshot.val();
      for(let profile in profiles) {
        console.log("profile: ", profile);

        console.log("username: ", profiles[profile]);

        if(profiles[profile].username === 'admin2') {
          this.profileID = profile;
          this.setStateInfo(profiles[profile]);
          this.setState({loading: false});
          this.props.setVisibilitySplashScreen();
          break;
        }
      }
    })
  }

  render() {
    const labels = {
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      location: "Location",
      healthStatus: "Health status",
      isMeetingRelateCovid:
        "Are you meeting someone who is related to Covid-19",
    };

    if(!this.props.hasShowOffSplashScreen) {
      return <SplashScreen />
    }

    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Your profile</h1>
      <form onSubmit={this.handleSubmit}>
        {" "}
        {Object.keys(this.state).map((item) =>  {
          return (
          <div className={styles.itemInput} key={item}>
            <p>{labels[item]}:</p>
            <input
                name={[item]}
                type="text"
                value={this.state[item]}
                onChange={this.handleChange}
              />
          </div>
        )}
        )}
        <input className={styles.submit} type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default Profile;
