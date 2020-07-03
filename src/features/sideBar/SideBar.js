import React from "react";
import {
  Link
} from "react-router-dom";
import classNames from "classnames";
import styles from "./SideBar.module.css";

class SideBarItem extends React.Component {

  compareName(info, itemSideBarChoosen) {
    console.log("itemSideBarChoosen:", itemSideBarChoosen, typeof itemSideBarChoosen);
    console.log("name:", info, typeof info);
    console.log(itemSideBarChoosen.trim() === info.trim());
  }

  render() {
    const {info, itemSideBarChoosen} = this.props;
    this.compareName(info.name, itemSideBarChoosen);
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
  constructor(props) {
    super(props);
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
          itemSideBarChoosen={this.props.itemSideBarChoosen}
        />
      </div>
    );
  }
}

export default SideBar;
