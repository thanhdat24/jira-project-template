import {
  ADD_USER_PROJECT_API,
  DELETE_PROJECT_SAGA,
  EDIT_PROJECT,
  GET_LIST_PROJECT_SAGA,
  GET_USER_API,
  REMOVE_USER_PROJECT_API,
} from "../../../redux/constants/Cyberbugs/Cyberbug";
import {
  AutoComplete,
  Avatar,
  Button,
  Popconfirm,
  Popover,
  Space,
  Table,
  Tag,
} from "antd";
import { CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormEditProject from "../../../components/Forms/FormEditProject/FormEditProject";
import { NavLink } from "react-router-dom";
import { OPEN_FORM_EDIT_PROJECT } from "../../../redux/constants/Cyberbugs/Cyberbug";

export default function ProjectManagement(props) {
  // Lấy dữ liệu từ reducer về component
  const projectList = useSelector(
    (state) => state.ProjectManagementReducer.projectList
  );
  // Sử dụng useDispatch để gọi action
  const dispatch = useDispatch();
  // Sử dụng searchRef để search trách api load lại ,search xong mới load
  const searchRef = useRef(null);
  const { userSearch } = useSelector(
    (state) => state.UserLoginCyberBugsReducer
  );
  const [value, setValue] = useState("");
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });
  useEffect(() => {
    dispatch({ type: GET_LIST_PROJECT_SAGA });
  }, []);
  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
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
      render: (text, record, index) => {
        return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;
      },
      sorter: (a, b) => {
        let projectName1 = a.projectName?.trim().toLowerCase();
        let projectName2 = b.projectName?.trim().toLowerCase();
        return projectName2 < projectName1 ? -1 : 1;
      },
    },
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
      title: "Members",
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="bottom"
                  title={"Member"}
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <td>Id</td>
                            <td>Avatar</td>
                            <td>Name</td>
                            <td></td>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((member, index) => {
                            return (
                              <tr key={index}>
                                <td>{member.userId}</td>
                                <td>
                                  <img
                                    src={member.avatar}
                                    alt={member.name}
                                    style={{
                                      borderRadius: "50%",
                                      width: "32px",
                                      height: "32px",
                                    }}
                                  />
                                </td>
                                <td>{member.name}</td>
                                <td>
                                  <Button
                                    onClick={() => {
                                      dispatch({
                                        type: REMOVE_USER_PROJECT_API,
                                        userProject: {
                                          projectId: record.id,
                                          userId: member.userId,
                                        },
                                      });
                                    }}
                                    type="danger"
                                    shape="circle"
                                  >
                                    X
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar key={index} src={member.avatar} />
                </Popover>
              );
            })}
            {record.members?.length > 3 ? (
              <Avatar style={{ backgroundColor: "#DDDDDD" }}>...</Avatar>
            ) : (
              ""
            )}

            <Popover
              placement="bottom"
              title={"Add member"}
              content={() => {
                return (
                  <AutoComplete
                    options={userSearch?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    value={value}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    onSelect={(valueSelect, option) => {
                      // set giá trị hộp thoại => option.label
                      setValue(option.label);
                      // Gọi API ADD_USER gửi về backend
                      dispatch({
                        type: ADD_USER_PROJECT_API,
                        userProject: {
                          projectId: record.id,
                          userId: valueSelect,
                        },
                      });
                    }}
                    style={{ width: "100%" }}
                    onSearch={(value) => {
                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispatch({ type: GET_USER_API, keyWord: value });
                      }, 300);
                    }}
                  />
                );
              }}
              trigger="click"
            >
              <Button
                style={{ borderRadius: "50%", width: "32px", height: "32px" }}
              >
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  +
                </span>
              </Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <button
            onClick={() => {
              const action = {
                type: OPEN_FORM_EDIT_PROJECT,
                Component: <FormEditProject />,
              };
              dispatch(action);
              // dispatch dữ liệu dòng hiện tại lên reducer
              const actionEditProject = {
                type: EDIT_PROJECT,
                projectEditModal: record,
              };
              dispatch(actionEditProject);
            }}
            className="btn btn-primary"
          >
            <EditOutlined />
          </button>
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => {
              dispatch({ type: DELETE_PROJECT_SAGA, projectId: record.id });
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className="btn btn-danger">
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div className="container project-management ">
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
