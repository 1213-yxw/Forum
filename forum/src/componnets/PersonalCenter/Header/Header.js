import React, { Component } from "react";
import { Link } from "react-router-dom";
/*------------------------------------------*/
import PersonalCenter from "../PersonalCenter.js";
import './Header.css'
/*------------------------------------------*/

//需要与后端交互 动态的显示用户的个人信息（呢称）
export default class Header extends Component {
  render() {
    return (
      <div className="header-container">
          <div className="title-box">
            <h1 className="title-blog">
              <Link to={PersonalCenter} style={{color:"lightsteelblue"}}>用户的个人论坛中心</Link>
            </h1>
          </div>
      </div>
    );
  }
}
