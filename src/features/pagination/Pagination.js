import React from "react";
import classNames from "classnames"
import styles from "./Pagination.module.css";

function isVisibleLeftBlank(page, maxPage) {
  return page > 3
}

function isVisibleRightBlank(page, maxPage) {
  return page < maxPage - 2
}

function setValueBtn(page, maxPage){
  const resultArr = [];

  // if(isVisibleLeftBlank(page, maxPage)) {
  //   resultArr[0] = 0;
  // }

  // if(isVisibleRightBlank(page, maxPage)) {
  //   resultArr[4] = 0;
  // }

  if(page < 3) {
    resultArr[0] = 2;
    resultArr[1] = 3;
    resultArr[2] = 0;
    resultArr[3] = 0;
    resultArr[4] = maxPage - 1;
  } else if (page === 3) {
    resultArr[0] = 2;
    resultArr[1] = 3;
    resultArr[2] = 4;
    resultArr[3] = 0;
    resultArr[4] = 0;
  } else if (page === maxPage - 2) {
    resultArr[0] = 0;
    resultArr[1] = 0;
    resultArr[2] = maxPage - 3;
    resultArr[3] = maxPage - 2;
    resultArr[4] = maxPage - 1;
  } else if (page > maxPage - 2) {
    resultArr[0] = 2;
    resultArr[1] = 0;
    resultArr[2] = 0;
    resultArr[3] = maxPage - 2;
    resultArr[4] = maxPage - 1;
  } else {
    resultArr[2] = page;
    resultArr[1] = page - 1;
    resultArr[3] = page + 1;
    resultArr[4] = 0;
    resultArr[0] = 0;
  }

  console.log("page: ", page);
  console.log("valueBtn: ", resultArr);
  console.log("left: ", isVisibleLeftBlank(page, maxPage));
  console.log("right: ", isVisibleRightBlank(page, maxPage));
  return resultArr;
}

class BlankBtn extends React.Component {
  render() {
    return (
      <div 
          className={classNames(styles.blankBtn, 
            styles.btnPagination,
            this.props.isVisible ? '' : styles.hiddenBtn
            )}
        > ...</div>
    )
  }
}

class NumberBtn extends React.Component {
  render() {
    const {page, setPage} = this.props;

    return (
      <div
        className={
          classNames(styles.btnPagination,
          page ? '' : styles.hiddenBtn
        )}
        onClick={() => setPage(page)}
        >
          {page}
      </div>
    )
  }
}

class Pagination extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isVisibleLeft: false,
      isVisibleRight: false,
    };

    this.valueBtn = [0, 0, 0, 0, 0];
  }

  componentWillMount() {
    const {page, maxPage} = this.props;

    this.valueBtn = [...setValueBtn(page, maxPage)];
  }

  componentWillUpdate() {
    const {page, maxPage} = this.props;

    this.valueBtn = [...setValueBtn(page, maxPage)];
  }

  render() {
    const {page, maxPage, setPage} = this.props;
    const valueBtn = this.valueBtn;
    //valueBtn = [...setValueBtn(page, maxPage)];

    return (
      <div className={styles.wrapper}>
        <div 
          className={classNames(styles.preBtn, styles.btnPagination)}
          onClick={() => setPage(page - 1)}
        > </div>{" "}
        <NumberBtn 
          page={1}
          setPage={setPage}
          />
        <NumberBtn
          page={valueBtn[0]}
          setPage={setPage}
        />
        <BlankBtn isVisible={isVisibleLeftBlank(page, maxPage)}/>
        <NumberBtn 
          page={valueBtn[1]}
          setPage={setPage}
        />
        <NumberBtn 
          page={valueBtn[2]}
          setPage={setPage}
        />
        <NumberBtn 
          page={valueBtn[3]}
          setPage={setPage}
        />
        <BlankBtn isVisible={isVisibleRightBlank(page, maxPage)}/>
        <NumberBtn 
          page={valueBtn[4]}
          setPage={setPage}
        />
        <NumberBtn 
          page={maxPage}
          setPage={setPage}
          />
        <div 
          className={classNames(styles.nextBtn, styles.btnPagination)}
          onClick={() => this.props.setPage(this.props.page + 1)}
        > </div>{" "}
      </div>
    );
  }
}

export default Pagination;