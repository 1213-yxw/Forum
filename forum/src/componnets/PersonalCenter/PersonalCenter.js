import React, { Component } from "react";
import { Layout } from "antd";
import { Route, Switch, withRouter } from "react-router";
/*------------------------------------------*/
import LeftNav from "./LeftNav/LeftNav.js";
import RichText from "./RichText/RichText.js";
import PostAll from "./PostAll/PostAll.js";
import Header from "./Header/Header.js";
import PostDetails from "../PostDetails/PostDetails.js"
import "./PersonalCenter.css";
import axios from "axios";
/*------------------------------------------*/
const { Footer, Sider, Content } = Layout;

class PersonalCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <Layout style={{ height: "100%", backgroundColor: "white" }}>
        <Header style={{ padding: 0 }} />
        <Layout
          style={{
            margin: "40px 80px 0px 80px",
            backgroundColor: "rgb(229, 241, 250)",
          }}
        >
          <Sider style={{ backgroundColor: "white" }}>
            <LeftNav />
          </Sider>
          <Content style={{ margin: "0 16px 20px 80px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Switch>
                <Route
                  path="/personalCenter/postAll"
                  component={PostAll}
                  exact
                />
                <Route path="/personalCenter/richText" component={RichText} />
                <Route path="/postDetails/:postId" component={PostDetails} />
              </Switch>
            </div>
          </Content>
        </Layout>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "white",
            marginTop: "50px",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}
export default withRouter(PersonalCenter);
