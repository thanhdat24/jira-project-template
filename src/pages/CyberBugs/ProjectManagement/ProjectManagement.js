import { Button, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";

import ReactHtmlParser from "react-html-parser";

const data = [
  {
    members: [
      {
        userId: 290,
        name: "khải",
        avatar: "https://ui-avatars.com/api/?name=khải",
      },
      {
        userId: 224,
        name: "Hoàng Long",
        avatar: "https://ui-avatars.com/api/?name=Hoàng Long",
      },
      {
        userId: 297,
        name: "Như",
        avatar: "https://ui-avatars.com/api/?name=Như",
      },
      {
        userId: 223,
        name: "Nhu",
        avatar: "https://ui-avatars.com/api/?name=Nhu",
      },
    ],
    creator: {
      id: 308,
      name: "Nothing",
    },
    id: 993,
    projectName: "Xây được vài cái rồi nhé bạn Như",
    description: "<p>haha - hihi</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "xay-duoc-vai-cai-roi-nhe-ban-nhu",
    deleted: false,
  },
  {
    members: [
      {
        userId: 116,
        name: "Man ",
        avatar: "https://ui-avatars.com/api/?name=Man ",
      },
      {
        userId: 128,
        name: "Tuấn123",
        avatar: "https://ui-avatars.com/api/?name=Tuấn123",
      },
    ],
    creator: {
      id: 304,
      name: "thien",
    },
    id: 995,
    projectName: "Jira Clone project12",
    description: "<p>Jira Clone project123</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "jira-clone-project12",
    deleted: false,
  },
  {
    members: [
      {
        userId: 232,
        name: "Chris",
        avatar: "https://ui-avatars.com/api/?name=Chris",
      },
      {
        userId: 6,
        name: "khai truong",
        avatar: "https://ui-avatars.com/api/?name=khai truong",
      },
      {
        userId: 199,
        name: "son",
        avatar: "https://ui-avatars.com/api/?name=son",
      },
    ],
    creator: {
      id: 257,
      name: "Chris Lee",
    },
    id: 998,
    projectName: "Lập trình miễn phí tại FPT",
    description:
      "<p>Đ&acirc;y l&agrave; k&ecirc;nh lập tr&igrave;nh đa t&agrave;i</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "lap-trinh-mien-phi-tai-fpt",
    deleted: false,
  },
  {
    members: [
      {
        userId: 6,
        name: "khai truong",
        avatar: "https://ui-avatars.com/api/?name=khai truong",
      },
      {
        userId: 116,
        name: "Man ",
        avatar: "https://ui-avatars.com/api/?name=Man ",
      },
    ],
    creator: {
      id: 305,
      name: "Hung",
    },
    id: 1001,
    projectName: "i8888",
    description: "<p>qqqqqqq</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "i8888",
    deleted: false,
  },
  {
    members: [
      {
        userId: 116,
        name: "Man ",
        avatar: "https://ui-avatars.com/api/?name=Man ",
      },
      {
        userId: 128,
        name: "Tuấn123",
        avatar: "https://ui-avatars.com/api/?name=Tuấn123",
      },
      {
        userId: 131,
        name: "Thắngsdasdasdasdasdas",
        avatar: "https://ui-avatars.com/api/?name=Thắngsdasdasdasdasdas",
      },
    ],
    creator: {
      id: 6,
      name: "khai truong",
    },
    id: 1002,
    projectName: "arishem51",
    description: "<p>hi123</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "arishem51",
    deleted: false,
  },
  {
    members: [],
    creator: {
      id: 6,
      name: "khai truong",
    },
    id: 1003,
    projectName: "sdad",
    description: "<p>dsa</p>",
    categoryId: 2,
    categoryName: "Dự án phần mềm",
    alias: "sdad",
    deleted: false,
  },
  {
    members: [],
    creator: {
      id: 6,
      name: "khai truong",
    },
    id: 1004,
    projectName: "newproject99",
    description: "<p>dsa</p>",
    categoryId: 2,
    categoryName: "Dự án phần mềm",
    alias: "newproject99",
    deleted: false,
  },
];
export default function ProjectManagement(props) {
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });
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
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      render: (text, record, index) => {
        let jsxContent = ReactHtmlParser(text);
        return <div>{jsxContent}</div>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <a>
            <EditOutlined />
          </a>
          <a>
            <DeleteOutlined />
          </a>
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
        dataSource={data}
        onChange={handleChange}
      />
    </div>
  );
}
