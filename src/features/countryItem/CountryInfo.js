import React from "react";
import axios from "axios";
import Loading from "../loading/Loading";
import config from "../../config.json";
import InfoByCase from "../InfoByCase/InfoByCase";
import SplashScreen from "../splashScreen/SplashScreen";
import Pagination from "../pagination/Pagination";
import styles from "./CountryInfo.module.css";

const ITEM_PER_PAGE = 5;

class ByDateItem extends React.Component {
  // {
  //   "Country": "Viet Nam",
  //   "CountryCode": "VN",
  //   "Province": "",
  //   "City": "",
  //   "CityCode": "",
  //   "Lat": "14.06",
  //   "Lon": "108.28",
  //   "Confirmed": 352,
  //   "Deaths": 0,
  //   "Recovered": 0,
  //   "Active": 352,
  //   "Date": "2020-06-24T00:00:00Z"
  //  }

  constructor(props) {
    super(props);
    if (this.props.name === "Vietnam") {
      this.props.setItemSideBarChoosen("Vietnam");
    } else {
      this.props.setItemSideBarChoosen("World");
    }
  }

  getData(item, preItem) {
    const TotalConfirmed = item.Confirmed;
    const TotalDeaths = item.Deaths;
    const TotalRecovered = item.Recovered;
    const NewConfirmed = item.Confirmed - (preItem ? preItem.Confirmed : 0);
    const NewDeaths = item.Deaths - (preItem ? preItem.Deaths : 0);
    const NewRecovered = item.Recovered - (preItem ? preItem.Recovered : 0);

    return {
      TotalConfirmed,
      TotalDeaths,
      TotalRecovered,
      NewConfirmed,
      NewDeaths,
      NewRecovered,
    };
  }

  render() {
    const transfomData = this.getData(this.props.item, this.props.preItem);
    //console.log("result get data: ", transfomData);
    return (
      <div>
        <InfoByCase cases={transfomData} />{" "}
      </div>
    );
  }
}

class ByDateItemList extends React.Component {
  convertNormalFormatDate(dateString) {
    const date = new Date(dateString);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }

  render() {
    const { byDateItemList } = this.props;
    //console.log("byDateItemList: ", byDateItemList);

    let result = [];

    for (let i = byDateItemList.length - 1; i >= 0; i--) {
      result.push(
        <div key={i}>
          <p> {this.convertNormalFormatDate(byDateItemList[i].Date)} </p>{" "}
          <ByDateItem
            item={byDateItemList[i]}
            preItem={!i ? null : byDateItemList[i - 1]}
            name={this.props.name}
            setItemSideBarChoosen={this.props.setItemSideBarChoosen}
          />{" "}
        </div>
      );
    }

    return <div> {result} </div>;
  }
}

function getInfoByPage(page, data) {
  const tmp = data.length - page*ITEM_PER_PAGE
  const positionFirstItem = tmp < 0 ? 0 : tmp;

  return data.slice(positionFirstItem, positionFirstItem + ITEM_PER_PAGE);
}

function getPages(amountItem) {
  return (Math.floor(amountItem / ITEM_PER_PAGE) + (amountItem % ITEM_PER_PAGE === 0 ? 0 : 1));
}

class CountryInfo extends React.Component {
  constructor(props) {
    super(props);

    // const paramsName = this.props.match.params.name;
    this.countryName = this.props.match
      ? this.props.match.params.name
      : props.name;
    console.log("countryName: ", this.countryName);

    this.setPage = this.setPage.bind(this);

    this.state = {
      loading: true,
      page: 1
    };
  }

  async getInfo() {
    console.log("this get info: ", this);

    const url = config.api + "/dayone/country/" + this.countryName;
    await axios.get(url).then((response) => {
      console.log("data length: ", response.data.length);

      this.maxPage = getPages(response.data.length);

      console.log("max page: ", this.maxPage);

      this.data = response.data;

      //this.currentData = getInfoByPage(this.state.page, this.data);

      this.setState({
        loading: false,
      });

      this.props.setVisibilitySplashScreen();
    });
  }

 

  setPage(page) {
    //console.log("page: ", page);
    //console.log("max page: ", this.maxPage);
    if(page > 1  && page <= this.maxPage) {
    this.setState({
      page: page
    });
  }
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
      <div className={styles.wrapper}>
        <div className={styles.header}> Information of {this.countryName} </div>{" "}
        <ByDateItemList 
          byDateItemList={getInfoByPage(this.state.page, this.data)}
          name={this.props.name} 
          setItemSideBarChoosen={this.props.setItemSideBarChoosen}
        />{" "}

        <Pagination setPage={this.setPage} page={this.state.page}/>
      </div>
    );
  }
}

export default CountryInfo;
