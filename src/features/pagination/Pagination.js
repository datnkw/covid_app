import React from "react";
import classNames from "classnames"
import styles from "./Pagination.module.css";

class Pagination extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div 
          className={classNames(styles.preBtn, styles.btnPagination)}
          onClick={() => this.props.setPage(this.props.page - 1)}
        > </div>{" "}
        <div 
          className={classNames(styles.nextBtn, styles.btnPagination)}
          onClick={() => this.props.setPage(this.props.page + 1)}
        > </div>{" "}
      </div>
    );
  }
}

export default Pagination;