import React from "react";
import axios from "axios";
import Loading from "../loading/Loading";
import InfoByCard from "../InfoByCase/InfoByCase"
import config from "../../config.json";
import SplashScreen from "../splashScreen/SplashScreen";
import SideBar from "../sideBar/SideBar";
import className from "classnames";
import {
  Link
} from "react-router-dom";
import styles from "./Dashboard.module.css";
import "../../App.css";

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
    const itemUrl = '/country/' + Country;
    return (
      <Link to={itemUrl}>
      <div className={styles.countryItem}>
        <p>{Country}</p>
        <p>{TotalConfirmed}</p>
      </div>
      </Link>
    );
  }
}

class CountryItemList extends React.Component {
  render() {
    const { countryItemList } = this.props;
    return countryItemList
      ? countryItemList.map((item) => <CountryItem key={item.Slug} info={item} />)
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

      this.props.setVisibilitySplashScreen();
    });
  }

  async componentDidMount() {
    await this.getInfo();
    console.log("this.props.setItemSideBarChoosen ", this.props.setItemSideBarChoosen)
    this.props.setItemSideBarChoosen('World');
  }

  render() {
    if(!this.props.hasShowOffSplashScreen) {
      return <SplashScreen />
    }

    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div className="full-width">
        <SideBar itemSideBarChoosen='World'/>
        <div className={className(styles.wrapper, "content")}>
        <InfoByCard cases={this.summaryGlobalInfo}/>
        <div className={styles.countryItemWrapper}>
          <CountryItemList countryItemList={this.summaryCountries} />
        </div>
      </div>
      </div>
    );
  }
}

export default Dashboard;
