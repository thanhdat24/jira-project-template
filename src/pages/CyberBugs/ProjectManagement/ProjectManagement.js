import { Button, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GET_LIST_PROJECT_SAGA } from "../../../redux/constants/Cyberbugs/Cyberbug";
import ReactHtmlParser from "react-html-parser";

export default function ProjectManagement(props) {
  // Lấy dữ liệu từ reducer về component
  const projectList = useSelector(
    (state) => state.ProjectManagementReducer.projectList
  );
  // Sử dụng useDispatch để gọi action
  const dispatch = useDispatch();
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });
  useEffect(() => {
    dispatch({ type: GET_LIST_PROJECT_SAGA });
  }, []);
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };
  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age",
      },
    });
  };
  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (a, b) => {
        let projectName1 = a.projectName?.trim().toLowerCase();
        let projectName2 = b.projectName?.trim().toLowerCase();
        return projectName2 < projectName1 ? -1 : 1;
      },
    },
    // {
    //   title: "description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text, record, index) => {
    //     let jsxContent = ReactHtmlParser(text);
    //     return <div>{jsxContent}</div>;
    //   },
    // },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (a, b) => {
        let categoryName1 = a.categoryName?.trim().toLowerCase();
        let categoryName2 = b.categoryName?.trim().toLowerCase();
        return categoryName2 < categoryName1 ? -1 : 1;
      },
    },
    {
      title: "Creator",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (a, b) => {
        let creator1 = a.creator.name?.trim().toLowerCase();
        let creator2 = b.creator.name?.trim().toLowerCase();
        return creator2 < creator1 ? -1 : 1;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <button className="btn btn-primary">
            <EditOutlined />
          </button>
          <button className="btn  btn-danger">
            <DeleteOutlined />
          </button>
        </Space>
      ),
    },
  ];
  return (
    <div className="container project-management">
      <h3 className="project-management__title">Project Management</h3>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={projectList}
        onChange={handleChange}
      />
    </div>
  );
}
