import React from "react";
import axios from "axios";
import Loading from "../loading/Loading";
import config from "../../config.json";
import InfoByCase from "../InfoByCase/InfoByCase"
import styles from "./CountryInfo.module.css";

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
      NewRecovered
    }
  }

  render() {
    const transfomData = this.getData(this.props.item, this.props.preItem);
    //console.log("result get data: ", transfomData);
    return (
      <div>
        <InfoByCase cases={transfomData}/>
      </div>
    );
  }
}

class ByDateItemList extends React.Component {
  convertNormalFormatDate(dateString){
    const date = new Date(dateString);
    return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
  }

  render() {
    const { byDateItemList } = this.props;
    //console.log("byDateItemList: ", byDateItemList);

    let result = [];

    for(let i = byDateItemList.length - 1; i >= 0; i--) {
        result.push(
        <div key={i}>
          <p>{this.convertNormalFormatDate(byDateItemList[i].Date)}</p>
        <ByDateItem 
                       
                      item={byDateItemList[i]}
                      preItem= {!i ? null : byDateItemList[i - 1]}
                      />
                      </div>)
    }

    return (
      <div>
      {result}
      </div>
    )
  }
}

class CountryInfo extends React.Component {

  constructor(props) {
    super(props);

    // const paramsName = this.props.match.params.name;
    this.countryName = (this.props.match ? this.props.match.params.name : props.name);
    console.log("countryName: ", this.countryName);

    this.state = {
      loading: true,
    };
  }

  async getInfo() {
    console.log('load data country info begin');
    const url = config.api + "/dayone/country/" + this.countryName;
    await axios.get(url).then((response) => {
      this.data = response.data;

      console.log('load data country info done');

      this.setState({ loading: false });

      if(this.props.setIsLoadingDataDoneState){
        this.props.setIsLoadingDataDoneState();
      }
    });
  }

  async componentDidMount() {
    await this.getInfo();
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>Information of {this.countryName}</div>
        <ByDateItemList byDateItemList={this.data} />
      </div>
    )
  }
}

export default CountryInfo;
