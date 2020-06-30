import React from "react";
import styles from "./InfoByCase.module.css";
import classNames from "classnames";

class InfoByCase extends React.Component {
  render() {
    const { cases } = this.props;
    // console.log("data in cases when render: ", cases);

    return (
      <div className={styles.card}>
        <div className={classNames(styles.new, styles.info)}>
          <p>
            {" "}
            New confirm: <span> {cases.NewConfirmed} </span>
          </p>
          <p>
            {" "}
            New death: <span> {cases.NewDeaths} </span>
          </p>
          <p>
            {" "}
            New recovered: <span> {cases.NewRecovered} </span>
          </p>
        </div>{" "}
        <div className={classNames(styles.total, styles.info)}>
          <p>
            {" "}
            Total confirm: <span> {cases.TotalConfirmed} </span>
          </p>
          <p>
            {" "}
            Total death: <span> {cases.TotalDeaths} </span>
          </p>
          <p>
            {" "}
            Total recovered: <span> {cases.TotalRecovered} </span>
          </p>
        </div>{" "}
      </div>
    );
  }
}

export default InfoByCase;