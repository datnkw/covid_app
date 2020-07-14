import React from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import InfoByCard from "../../components/InfoByCase";
import config from "../../utils/config.json";
import SplashScreen from "../../components/SplashScreen";
import SideBar from "../../components/SideBar";
import className from "classnames";
import { Link } from "react-router-dom";
import Styles from "./Dashboard.module.css";


import Pagination from "../../components/Pagination";
import HocPagination from "../../components/HocPagination";

const ITEM_PER_PAGE = 15;
const DEFAULT_URL = '/world';

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
    const itemUrl = "/country/" + Country;
    return (
      <Link to={itemUrl}>
        <div className={Styles.countryItem}>
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
      ? countryItemList.map((item) => (
          <CountryItem key={item.Slug} info={item} />
        ))
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
    if (window.navigator.onLine) {
      await axios.get(url).then((response) => {
        this.summaryGlobalInfo = response.data.Global;
        this.summaryCountries = response.data.Countries;

        this.props.setData(response.data.Countries.reverse());

        localStorage.setItem(
          "summaryGlobalInfo",
          JSON.stringify(this.summaryGlobalInfo)
        );
        localStorage.setItem(
          "summaryCountries",
          JSON.stringify(this.summaryCountries)
        );
      });
    } else {
      this.summaryGlobalInfo = JSON.parse(
        localStorage.getItem("summaryGlobalInfo")
      );
      this.summaryCountries = JSON.parse(
        localStorage.getItem("summaryCountries")
      );
    }

    this.setState({ loading: false });
    this.props.setVisibilitySplashScreen();
  }

  async componentDidMount() {
    await this.getInfo();
  }

  render() {
    if (!this.props.hasShowOffSplashScreen) {
      return <SplashScreen />;
    }

    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div className="full-width">
        <SideBar itemSideBarChoosen="World" />
        <div className={className(Styles.wrapper, "content")}>
        <InfoByCard cases={this.summaryGlobalInfo} />
          <div className={Styles.countryItemWrapper}>
            <CountryItemList countryItemList={this.props.dataCurrentPage} />
          </div>
          <Pagination
            setPage={this.props.setPage}
            page={this.props.page}
            maxPage={this.props.maxPage}
          />
        </div>
      </div>
    );
  }
}

export default HocPagination(Dashboard, ITEM_PER_PAGE, DEFAULT_URL);
