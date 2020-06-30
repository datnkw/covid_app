import React from "react";
import {
  Link
} from "react-router-dom";
import classNames from "classnames";
import styles from "./SideBar.module.css";

class SideBarItem extends React.Component {

  render() {
    const {info, isClicked, onClick} = this.props;
    return (
      <Link to={info.to}>
        <div
          className={classNames(styles["side-bar-item"], {
            [styles.clicked]: isClicked === info.name,
          })}
          onClick={() => onClick(info.name)}
        >
          {info.name}
        </div>
      </Link>
    );
  }
}

class ItemSideBarList extends React.Component {

  render() {
    const {itemLists, isClicked, onClick} = this.props
    return itemLists
      ? itemLists.map((item) => (
          <SideBarItem
            key={item.name ? item.name : ""}
            info={item}
            isClicked={isClicked}
            onClick={onClick}
          />
        ))
      : null;
  }
}

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.clickItem = this.clickItem.bind(this);
    this.state = {
      isClicked: "Vietnam",
    };
  }

  clickItem(name) {
    this.setState({
      isClicked: name
    });
  }

  render() {
    const {itemSideBarInfoList} = this.props
    return (
      <div className={styles["wrapper-side-bar"]}>
        <div className={styles["logo-wrapper"]}>
          <div className={styles["logo"]}></div>
          <p>Covid-19 app</p>
        </div>

        <ItemSideBarList
          itemLists={itemSideBarInfoList}
          isClicked={this.state.isClicked}
          onClick={this.clickItem}
        />
      </div>
    );
  }
}

export default SideBar;
