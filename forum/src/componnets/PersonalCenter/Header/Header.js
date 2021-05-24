import React, { Component } from "react";
import { Link } from "react-router-dom";
/*------------------------------------------*/
import PersonalCenter from "../PersonalCenter.js";
import './Header.css'
import {User} from "../../PostDetails/User.js"
/*------------------------------------------*/

export default class Header extends Component {
  render() {
    return (
      <div className="header-container">
          <div className="title-box">
            <h1 className="title-blog">
              <Link to={PersonalCenter} style={{color:"lightsteelblue"}}>{User.userName}的个人论坛中心</Link>
            </h1>
          </div>
      </div>
    );
  }
}
