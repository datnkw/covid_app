import React from "react";
import axios from "axios";
import Loading from "../loading/Loading"
import config from "../../config.json"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import styles from './Dashboard.module.css'
import { render } from "@testing-library/react";

class ItemDashboardCountry extends React.Component {
  // {
  //   "Country": "Afghanistan",
  //   "CountryCode": "AF",
  //   "Slug": "afghanistan",
  //   "NewConfirmed": 165,
  //   "TotalConfirmed": 30616,
  //   "NewDeaths": 20,
  //   "TotalDeaths": 703,
  //   "NewRecovered": 368,
  //   "TotalRecovered": 10674,
  //   "Date": "2020-06-29T04:06:12Z"
  // }

  constructor(props) {
    super(props);

  }

  render() {
    const {
      Country, 
      NewConfirmed, 
      TotalConfirmed, 
      NewDeaths, 
      TotalDeaths, 
      NewRecovered, 
      TotalRecovered
    } = this.props;

    return (
      <div></div>
    )
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };

    // this.getInfo();
  }

  async getInfo(){
    const url = config.api + '/summary'
    await axios.get(url).then(response => {
      this.summaryGlobalInfo = response.data.Global;
      console.log(response.data.Global);

      this.setState({ loading: false });
    })
  }

  
  async componentDidMount() {
    await this.getInfo();
    //console.log("this global in function: ", this.summaryGlobalInfo)
  }

  render() {
    //console.log("this global: ", this.summaryGlobalInfo);

    if (this.state.loading) {
      console.log("render loading: ", this.state.loading)
      return <Loading />;
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.globalInfoContainer} >
    <p>New confirmed: <span>{this.summaryGlobalInfo.NewConfirmed}</span></p>
    <p>Total confirmed: <span>{this.summaryGlobalInfo.TotalConfirmed}</span></p>
    <p>New deaths: <span>{this.summaryGlobalInfo.NewDeaths}</span></p>
    <p>Total deaths: <span>{this.summaryGlobalInfo.TotalDeaths}</span></p>
    <p>New recovered: <span>{this.summaryGlobalInfo.NewRecovered}</span></p>
    <p>Total recovered: <span>{this.summaryGlobalInfo.TotalRecovered}</span></p>
        </div>
      </div>

      
    );
  }
}

export default Dashboard