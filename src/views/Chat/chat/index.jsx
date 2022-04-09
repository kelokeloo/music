// RCE CSS
import "react-chat-elements/dist/main.css";
// MessageBox component
import { MessageBox } from "react-chat-elements";

import { ChatItem, SideBar, Popup } from "react-chat-elements";

import { TokenTest } from '../../../components/common/tokenTest'


export function Chat(){
  return (
    <div>
      <TokenTest></TokenTest>
    </div>
  )
}