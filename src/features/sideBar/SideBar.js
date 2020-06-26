import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./SideBar.module.css";

const SideBarItem = ({ info, isClicked, onClick }) => {
  return (
    <div
      className={classNames(styles["side-bar-item"], {
        [styles.clicked]: isClicked === info.name,
      })}
      onClick={() => onClick(info.name)}
    >
      {info.name}
    </div>
  );
};

class ItemSideBarList extends React.Component {
  constructor({ itemLists, isClicked, onClick }) {
    super({ itemLists, isClicked, onClick });
  }

  render() {
    return this.itemLists
      ? this.itemLists.map((item) => (
          <SideBarItem
            key={item.name ? item.name : ""}
            info={item}
            isClicked={this.isClicked}
            onClick={this.onClick}
          />
        ))
      : null;
  }
}

class SideBar extends React.Component {
  constructor({ itemSideBarInfoList }) {
    super({
      itemSideBarInfoList,
    });
    this.clickItem = this.clickItem.bind(this);
    this.state = {
      isClicked: "Vietnam",
    };
  }

  clickItem(name) {
    this.setIsClicked(name);
    console.log("name click: ", name);
  }

  render() {
    return (
      <div className={styles["wrapper-side-bar"]}>
        <div className={styles["logo-wrapper"]}>
          <div className={styles["logo"]}></div>
          <p>Covid-19 app</p>
        </div>
        <ItemSideBarList
          itemLists={this.itemSideBarInfoList}
          isClicked={this.isClicked}
          onClick={this.clickItem}
        />
      </div>
    );
  }
}

export default SideBar;
