import React from "react";
import axios from "axios";
import Loading from "../loading/Loading";
import config from "../../config.json";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import styles from "./Dashboard.module.css";
import { render } from "@testing-library/react";

class CountryItem extends React.Component {
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

  render() {
    const { Country, TotalConfirmed } = this.props.info;

    return (
      <div className={styles.countryItem}>
        <p>{Country}</p>
        <p>{TotalConfirmed}</p>
      </div>
    );
  }
}

class CountryItemList extends React.Component {
  render() {
    const { countryItemList } = this.props;
    return countryItemList
      ? countryItemList.map((item) => <CountryItem info={item} />)
      : null;
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  async getInfo() {
    const url = config.api + "/summary";
    await axios.get(url).then((response) => {
      this.summaryGlobalInfo = response.data.Global;
      this.summaryCountries = response.data.Countries;
      console.log(response.data.Global);

      this.setState({ loading: false });
    });
  }

  async componentDidMount() {
    await this.getInfo();
    //console.log("this global in function: ", this.summaryGlobalInfo)
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.globalInfoContainer}>
          <p>
            New confirmed: <span>{this.summaryGlobalInfo.NewConfirmed}</span>
          </p>
          <p>
            Total confirmed:{" "}
            <span>{this.summaryGlobalInfo.TotalConfirmed}</span>
          </p>
          <p>
            New deaths: <span>{this.summaryGlobalInfo.NewDeaths}</span>
          </p>
          <p>
            Total deaths: <span>{this.summaryGlobalInfo.TotalDeaths}</span>
          </p>
          <p>
            New recovered: <span>{this.summaryGlobalInfo.NewRecovered}</span>
          </p>
          <p>
            Total recovered:{" "}
            <span>{this.summaryGlobalInfo.TotalRecovered}</span>
          </p>
        </div>

        <div className={styles.countryItemWrapper}>
          <CountryItemList countryItemList={this.summaryCountries} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
