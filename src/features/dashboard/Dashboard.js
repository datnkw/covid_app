import React from "react";
import axios from "axios";
import Loading from "../loading/Loading";
import InfoByCard from "../InfoByCase/InfoByCase";
import config from "../../config.json";
import SplashScreen from "../splashScreen/SplashScreen";
import SideBar from "../sideBar/SideBar";
import className from "classnames";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import queryString from "query-string";
import {withRouter} from "react-router-dom";
import "../../App.css";
import Pagination from "../pagination/Pagination";

const ITEM_PER_PAGE = 15;

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
      ? countryItemList.map((item) => (
          <CountryItem key={item.Slug} info={item} />
        ))
      : null;
  }
}

function getInfoByPage(page, data) {
  const positionFirstItem = data.length - page * ITEM_PER_PAGE;

  if (positionFirstItem >= 0) {
    return data.slice(positionFirstItem, positionFirstItem + ITEM_PER_PAGE);
  } else {
    return data.slice(0, ITEM_PER_PAGE + positionFirstItem);
  }
}

function getPages(amountItem) {
  return (
    Math.floor(amountItem / ITEM_PER_PAGE) +
    (amountItem % ITEM_PER_PAGE === 0 ? 0 : 1)
  );
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.setPage = this.setPage.bind(this);
    const currentPage = props.location.search ? queryString.parse(props.location.search).page : 1;
    console.log("currentPage: ", currentPage);
    this.state = {
      loading: true,
      page: currentPage
    };
  }

  setPage(page) {
    if (page > 0 && page <= this.maxPage) {
      this.props.history.push('/world/' + '?page=' + page);
      this.setState({
        page,
      });
    }
  }

  async getInfo() {
    const url = config.api + "/summary";
    if (window.navigator.onLine) {
      await axios.get(url).then((response) => {
        this.summaryGlobalInfo = response.data.Global;
        this.summaryCountries = response.data.Countries;

        this.maxPage = getPages(response.data.Countries.length);

        localStorage.setItem(
          "summaryGlobalInfo",
          JSON.stringify(this.summaryGlobalInfo)
        );
        localStorage.setItem(
          "summaryCountries",
          JSON.stringify(this.summaryCountries)
        );
        localStorage.setItem('maxPage', this.maxPage);
      });
    } else {
      this.summaryGlobalInfo = JSON.parse(
        localStorage.getItem("summaryGlobalInfo")
      );
      this.summaryCountries = JSON.parse(
        localStorage.getItem("summaryCountries")
      );
      this.maxPage = localStorage.getItem('maxPage');
    }

    this.setState({ loading: false });
    this.props.setVisibilitySplashScreen();
  }

  async componentDidMount() {
    await this.getInfo();
    this.props.setItemSideBarChoosen("World");
  }

  render() {
    if (!this.props.hasShowOffSplashScreen) {
      return <SplashScreen />;
    }

    if (this.state.loading) {
      return <Loading />;
    }
    console.log("this page: ", this.state.page);
    console.log("this info page: ", getInfoByPage(this.state.page, this.summaryCountries));
    return (
      <div className="full-width">
        <SideBar itemSideBarChoosen="World" />
        <div className={className(styles.wrapper, "content")}>
        <InfoByCard cases={this.summaryGlobalInfo} />
          <div className={styles.countryItemWrapper}>
            <CountryItemList countryItemList={getInfoByPage(this.state.page, this.summaryCountries)} />
          </div>
          <Pagination
            setPage={this.setPage}
            page={this.state.page}
            maxPage={this.maxPage}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
