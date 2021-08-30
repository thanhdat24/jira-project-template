import {
  BarsOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

import React from "react";
import { useState } from "react";

const { Header, Sider, Content } = Layout;
export default function Sidebar() {
  const [state, setState] = useState({
    collapsed: false,
  });
  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  return (
    <div style={{ zIndex: "100" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={state.collapsed}
        style={{ height: "100%" }}
      >
        <div className="text-center" onClick={toggle}>
          <BarsOutlined
            style={{
              cursor: "pointer",
              color: "#fff",
              fontSize: 25,
              marginTop: 20,
            }}
          />
        </div>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<SearchOutlined style={{ fontSize: 20 }} />}>
            Search issues
          </Menu.Item>
          <Menu.Item key="2" icon={<PlusOutlined style={{ fontSize: 20 }} />}>
            Create Issue
          </Menu.Item>
          <Menu.Item key="3" icon={<QuestionCircleOutlined />}>
            About
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}
