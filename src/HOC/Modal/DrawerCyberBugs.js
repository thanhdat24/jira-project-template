import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
} from "../../redux/constants/Cyberbugs/Cyberbug";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Fragment } from "react";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function DrawerCyberBugs(props) {
  const dispatch = useDispatch();
  const { visible, componentContent, callBackSubmit } = useSelector(
    (state) => state.DrawerReducer
  );
  console.log(visible);

  const showDrawer = () => {
    dispatch({ type: OPEN_DRAWER });
  };
  const onClose = () => {
    dispatch({ type: CLOSE_DRAWER });
  };
  return (
    <Fragment>
      <button onClick={showDrawer}>Open</button>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        {/* Nội dung Drawer */}
        {componentContent}
      </Drawer>
    </Fragment>
  );
}
