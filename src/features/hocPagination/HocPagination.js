import React from "react";
import Pagination from "../pagination/Pagination";
import queryString from "query-string";
import {withRouter} from "react-router-dom";

function HocPagination(WrappedComponent, itemPerPage, defaultURL) {
  return withRouter(class extends React.Component {
    constructor(props) {
      super(props);
      console.log("props.location: ", props.location);
      const currentPage = props.location.search ? queryString.parse(props.location.search).page : 1;
      console.log("this current page: ", currentPage);
      this.state = {
        page: currentPage,
        maxPage: 0,
        data: [],
        dataCurrentPage: []
      }
    }

    getInfoByPage = (page, data) => {
      const positionFirstItem = data.length - page * itemPerPage;

      console.log("data in get info: ", data);
      console.log("numpage: ", page);

      if (positionFirstItem >= 0) {
        return data.slice(positionFirstItem, positionFirstItem + itemPerPage);
      } else {
        return data.slice(0, itemPerPage + positionFirstItem);
      }
    };

    setData = (data) => {
      this.setState({
        data,
        maxPage: this.getMaxPage(data.length)
      })

      console.log("this data: ", this.state.data);

      this.setState({
        dataCurrentPage: this.getInfoByPage(this.state.page, this.state.data)
      })

      console.log("this current data: ", this.state.dataCurrentPage);
    };

    getMaxPage = (amountItem) => {
      return (Math.floor(amountItem / itemPerPage)
      + (amountItem % itemPerPage === 0 ? 0 : 1));
    };

    setPage = (page) => {
      console.log("this page:", page);
      if (page > 0 && page <= this.state.maxPage) {
        //console.log("compare two data: ", this.compareArrays(dataCurrentPage, newdataCurrentPage))
        this.props.history.push(defaultURL + '?page=' + page);
        this.setState({
          page
        });
        
      }
    }

    compareArrays(arr, secondArr) {
      return JSON.stringify(arr) === JSON.stringify(secondArr);
    }

    componentDidUpdate(prevProps, prevState) {
      //const { page, maxPage } = this.props;
    const { dataCurrentPage } = prevState;
    const newdataCurrentPage = this.getInfoByPage(this.state.page, this.state.data);

    if (!this.compareArrays(dataCurrentPage, newdataCurrentPage)) {
      this.setState({
        dataCurrentPage: [...newdataCurrentPage],
      });
    }
    }

    render() {
      return (
      <div>
      <WrappedComponent
        dataCurrentPage={this.state.dataCurrentPage}
        setData={this.setData}
        setPage={this.setPage}
        page={this.state.page}
        maxPage={this.state.maxPage}
        {...this.props}
      />
      
      </div>);
    }
  });
}

export default HocPagination;
