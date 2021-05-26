import React, { Component } from "react";
import { withRouter, Link, NavLink } from "react-router-dom";
import { Menu, Image, Avatar, Card } from "antd";
import { Get } from "react-axios";
/*------------------------------------------*/
import headImg from "../LeftNav/Image/HeadPicture.jpg";
import "./LeftNav.css";
import FrmUpdateAvatar from "../Avatar/FrmUpdateAvatar.js";
/*------------------------------------------*/

class LeftNav extends Component {
  
  menuList;

  getMenuNodes = (menuList) => {
    return menuList.map((item) => {
      return (
        <Menu.Item key={item.url}>
          <Link to={item.url}>
            <span>{item.text}</span>
          </Link>
        </Menu.Item>
      );
    });
  };

  renderMenu(menuList) {
    const path = this.props.location.pathname;
    console.log("render->" + path);
    return (
      <div>
        <NavLink to="">
          <Avatar
            className="avatar-headimg"
            src={<Image src={headImg} />}
            size={80}
          />
        </NavLink>
        <Menu
          className="menuLeft-nav"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[path]}
        >
          {this.getMenuNodes(menuList)}
        </Menu>
      </div>
    );
  }

  render() {
    return (
      <Get url="https://localhost:5001/api/PersonalCenter/getMenus">
        {(error, response, isLoading, onReload) => {
          if (error) {
            return (
              <div>
                Something bad happened: {error.message}{" "}
                <button onClick={() => onReload({ params: { reload: true } })}>
                  Retry
                </button>
              </div>
            );
          } else if (response !== null) {
            //跨域成功 渲染菜单
            return this.renderMenu(response.data);
          } else if (isLoading) {
            return <div>Loading...</div>;
          }
          return <div>Default message before request is made.</div>;
        }}
      </Get>
    );
  }
}

export default withRouter(LeftNav);
/**
 * 
 * <Avatar
          src={<Image src={headImg} />}
          size={60}
          
        >
          onClick={}
        </Avatar>
 * 
 * <AvatarEditor
          image={<Image src={headImg} />}
          width={100}
          height={100}
          border={50}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1.2}
          rotate={0}
          //onImageChange={<FrmUpdateAvatar/>}
        >
        </AvatarEditor>
 * 
 *
 */
