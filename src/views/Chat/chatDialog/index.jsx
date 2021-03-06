import {
  ArrowLeftOutlined,
  CustomerServiceOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./index.module.scss";
import { Input, Button } from "antd";
const { TextArea } = Input;
import { useState, useEffect, useRef } from "react";
import {
  getDialogData,
  getDialogReadMsg,
  login,
  setUserReadMsg,
} from "../../../api/common/load";
import { MsgBox } from "../../../components/chat/msgBox";
import { baseUrl } from "../../../global.conf";
import moment from "moment";

export function ChatDialog(props) {
  const { socket, unReadMsgData, setUnReadMsgData } = props;
  const { ws } = socket;
  const navigateTo = useNavigate();
  function goback() {
    navigateTo(-1);
  }
  // 发送的text
  const [inputValue, setInputValue] = useState("");
  function handleInputValueChange(ev) {
    setInputValue(ev.target.value);
  }
  // 获取dialogID
  const { dialogId } = useParams();

  // 对话数据
  const [msgList, setMsgList] = useState({
    list: [],
  });
  // 对话框包含用户
  let users = [];

  // 获取对话已读数据
  useEffect(() => {
    let cancel = false;
    getDialogReadMsg(dialogId).then((res) => {
      if (cancel) return;
      console.log("resRaw", res);
      res.map((item) => {
        return (item.headIcon = baseUrl + item.headIcon);
      });

      setMsgList((msgList) => {
        // 如果res中已经有msgList.list里面的内容了 unique操作
        msgList.list.forEach((msgListItem) => {
          if (
            res.findIndex(
              (resItem) => resItem.timeStamp === msgListItem.timeStamp
            ) === -1
          ) {
            // 不在则添加进去
            res.push(msgListItem);
          }
        });
        //   console.log('对话框已读消息', res);
        // 滚动
        const scrollTime = setTimeout(() => {
          scrollToBottom();
          clearTimeout(scrollTime);
        });
        return {
          list: res,
        };
      });
    });
    return () => {
      cancel = true;
    };
  }, []);

  // 消息滚动到底部
  function scrollToBottom() {
    const domWrapper = mainContainerRef.current; // 外层容器 出现滚动条的dom
    (function smoothscroll() {
      const currentScroll = domWrapper.scrollTop; // 已经被卷掉的高度
      const clientHeight = domWrapper.offsetHeight; // 容器高度
      const scrollHeight = domWrapper.scrollHeight; // 内容总高度
      if (scrollHeight - 10 > currentScroll + clientHeight) {
        window.requestAnimationFrame(smoothscroll);
        domWrapper.scrollTo(
          0,
          currentScroll + (scrollHeight - currentScroll - clientHeight) / 2
        );
      }
    })();
    console.log("滚动");
  }

  const mainContainerRef = useRef(null);

  // 发送数据
  function sendMsg() {
    const loginUserId = window.sessionStorage.getItem("userid");
    const info = {
      belong: loginUserId,
      content: {
        type: "text",
        value: inputValue,
      },
      timeStamp: new Date().valueOf(),
      readList: [loginUserId],
    };
    // 发送新消息到服务器
    const sendData = {
      dialogId,
      data: info,
    };
    console.log("[send]", sendData);
    ws.send(
      JSON.stringify({
        type: "message",
        value: sendData,
      })
    );

    // socket.send(JSON.stringify({
    //   type: 'message',
    //   message: info
    // }))
    // 将新数据添加到list中
    setMsgList((msgList) => {
      info.username = window.sessionStorage.getItem("username");
      info.headIcon = window.sessionStorage.getItem("headIcon");
      msgList.list.push(info);
      return JSON.parse(JSON.stringify(msgList));
    });
    // const copyMsgList = JSON.parse(JSON.stringify(msgList))
    // copyMsgList.list.push(info)
    // setMsgList(copyMsgList)
    // 清除表单
    setInputValue("");
    // 滚动
    // 滚动
    const scrollTime = setTimeout(() => {
      scrollToBottom();
      clearTimeout(scrollTime);
    });
  }

  // 监听未读消息
  useEffect(() => {
    let cancel = false;
    const loginUserId = window.sessionStorage.getItem("userid");
    // 找到对应对话框数据
    const index = unReadMsgData.list.findIndex(
      (item) => item.dialogId === dialogId
    );
    if (index === -1) {
      console.log("没有新消息");
      return;
    }
    const unReadlist = JSON.parse(
      JSON.stringify(unReadMsgData.list[index])
    ).unReadlist;
    // 设置成已读， 向服务器发起请求，将消息从未读消息动态中删除
    console.log("[对话框未读消息]", unReadMsgData.list[index].unReadlist);
    if (cancel) return;
    setMsgList((msgList) => {
      if (cancel) return;
      // 将数据设置成已读
      unReadlist.forEach((item) => {
        item.headIcon = baseUrl + item.headIcon;
        if (item.readList.findIndex((item) => item === loginUserId) === -1) {
          // 不在已读中
          item.readList.push(loginUserId);
        }
      });
      console.log("[对话框-已读-消息]", unReadlist);
      // 清空unReadlist
      setUnReadMsgData((unReadMsgData) => {
        if (cancel) return;
        const targetIndex = unReadMsgData.list.findIndex(
          (item) => item.dialogId === dialogId
        );
        unReadMsgData.list.splice(targetIndex, 1);
        return JSON.parse(JSON.stringify(unReadMsgData));
      });

      // let { list } =
      return {
        list: [...msgList.list, ...unReadlist],
      };
    });

    // 同步到数据库 dialogId 、userId
    setUserReadMsg(dialogId).then((data) => {
      console.log("change", data);
    });

    // 滚动
    const scrollTime = setTimeout(() => {
      scrollToBottom();
      clearTimeout(scrollTime);
    });
    return () => {
      cancel = true;
    };
  }, [unReadMsgData]);

  return (
    <div className={classes.box}>
      <header className={classes.header}>
        <ArrowLeftOutlined className={classes.iconStyle} onClick={goback} />
      </header>
      <div className={classes.mainContainer} ref={mainContainerRef}>
        <div className={classes.main}>
          {msgList.list.map((item, index) => {
            return (
              <MsgBox
                key={`${item.time}_${item.belong}_${index}`}
                {...item}
              ></MsgBox>
            );
          })}
        </div>
      </div>

      <div className={classes.input}>
        <Button icon={<CustomerServiceOutlined />}></Button>
        <TextArea
          autoSize={{ minRows: 1, maxRows: 3 }}
          value={inputValue}
          onChange={handleInputValueChange}
        />
        <Button icon={<SendOutlined />} onClick={sendMsg}></Button>
      </div>
    </div>
  );
}
