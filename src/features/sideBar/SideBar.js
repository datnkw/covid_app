import React from "react";
import {
  Link
} from "react-router-dom";
import classNames from "classnames";
import styles from "./SideBar.module.css";

class SideBarItem extends React.Component {


  render() {
    const {info, itemSideBarChoosen} = this.props;
    return (
      <Link to={info.to}>
        <div
          className={classNames(styles["side-bar-item"], {
            [styles.clicked]: itemSideBarChoosen === info.name,
          })}
        >
          {info.name}
        </div>
      </Link>
    );
  }
}

class ItemSideBarList extends React.Component {

  render() {
    const {itemLists, itemSideBarChoosen} = this.props
    return itemLists
      ? itemLists.map((item) => (
          <SideBarItem
            key={item.name ? item.name : ""}
            info={item}
            itemSideBarChoosen={itemSideBarChoosen}
          />
        ))
      : null;
  }
}

class SideBar extends React.Component {
  render() {
    const itemSideBarInfoList = [
      {
        name: "Vietnam",
        to: "/",
      },
      {
        name: "World",
        to: "/world",
      },
      {
        name: "Profile",
        to: "/profile",
      },
    ];

    return (
      <div className={styles["wrapper-side-bar"]}>
        <div className={styles["logo-wrapper"]}>
          <div className={styles["logo"]}></div>
          <p>Covid-19 app</p>
        </div>

        <ItemSideBarList
          itemLists={itemSideBarInfoList}
          itemSideBarChoosen={this.props.itemSideBarChoosen}
        />
      </div>
    );
  }
}

export default SideBar;
