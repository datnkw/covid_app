import React from "react";
import styles from "./Profile.module.css";

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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    event.preventDefault();
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
            {/* <br /> */}
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
