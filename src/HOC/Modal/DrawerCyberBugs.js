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
  const { visible, componentContent, callBackSubmit, title } = useSelector(
    (state) => state.DrawerReducer
  );

  const showDrawer = () => {
    dispatch({ type: OPEN_DRAWER });
  };
  const onClose = () => {
    dispatch({ type: CLOSE_DRAWER });
  };
  return (
    <Fragment>
      <Drawer
        title={title}
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
            <Button
              onClick={callBackSubmit}
              type="primary"
              style={{ marginRight: 8 }}
            >
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        }
      >
        {/* Nội dung Drawer */}
        {componentContent}
      </Drawer>
    </Fragment>
  );
}
