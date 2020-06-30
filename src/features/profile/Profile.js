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
      <form onSubmit={this.handleSubmit}>
        {" "}
        {Object.keys(this.state).map((item) =>  {
          return (
          <div key={item}>
            <label >
              {" "}
              {labels[item]}:
              <input
                name={[item]}
                type="text"
                value={this.state[item]}
                onChange={this.handleChange}
              />{" "}
            </label>{" "}
            <br />
          </div>
        )}
        )}
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Profile;
