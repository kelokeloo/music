import {
  CustomerServiceOutlined,
  UserOutlined,
  CommentOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

import classes from "./index.module.scss";

import { useState } from "react";

export function Nav(props) {
  const { actived, onClick, unReadMsgData } = props;

  const layout = {
    style: {
      fontSize: "1.6rem",
    },
  };

  const icons = [
    <CustomerServiceOutlined {...layout} />,
    <CommentOutlined {...layout} />,
    <InstagramOutlined {...layout} />,
    <UserOutlined {...layout} />,
  ];

  function handleNavClick(index) {
    onClick(index);
  }

  return (
    <div className={classes.box}>
      {icons.map((item, index) => {
        return (
          <div
            className={classes.navItemBox}
            onClick={() => {
              handleNavClick(index);
            }}
            key={index}
          >
            <section className={actived === index ? classes.activedStyle : ""}>
              {item}
            </section>
            {index === 1 && unReadMsgData.list.length >= 1 ? (
              <span className={classes.notify}></span>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
}
