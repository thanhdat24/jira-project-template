import {
  CHANGE_ASSIGNEES,
  GET_ALL_PRIORITY_SAGA,
  GET_ALL_TASK_TYPE_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGNEES,
} from "../../../redux/constants/Cyberbugs/Cyberbug.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "antd";
import { CHANGE_TASK_MODAL } from "../../../redux/constants/Cyberbugs/Cyberbug";
import { Editor } from "@tinymce/tinymce-react";
import { GET_ALL_STATUS_SAGA } from "../../../redux/constants/Cyberbugs/StatusConstants";
import ReactHtmlParser from "react-html-parser";
import { Select } from "antd";

export default function Modal(props) {
  const [size, setSize] = React.useState("default");
  const dispatch = useDispatch();
  const { taskDetailModal } = useSelector((state) => state.TaskReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { projectDetail } = useSelector((state) => state.ProjectDetailReducer);
  // Mãng kh phải obj , bật tắt Editor
  const [visibleEditor, setVisibleEditor] = useState(false);
  // giữ lại content lúc chính sửa ban đầu để kh làm thay đổi value
  const [historyContent, setHistoryContent] = useState(
    taskDetailModal.description
  );
  // content chỉnh sửa trước khi save
  const [content, setContent] = useState(taskDetailModal.description);
  console.log("lstTaskDeTail", taskDetailModal);
  const divContent = () => {
    return (
      <div
        className="a"
        style={{
          display: "flex",
          alignItems: "center",
          color: "rgb(0, 82, 204)",
          fontWeight: "400",
          cursor: "pointer",
        }}
      >
        <i
          className="fa fa-plus"
          style={{
            marginRight: 5,
            fontSize: "13",
          }}
        />
        <a>Add more</a>
      </div>
    );
  };
  useEffect(() => {
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
  }, []);

  const renderDescription = () => {
    const jsxDescription = ReactHtmlParser(taskDetailModal.description);
    return (
      <div>
        {visibleEditor ? (
          <div>
            <Editor
              name="description"
              initialValue={taskDetailModal.description}
              init={{
                height: 180,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image",
                  "charmap print preview anchor help",
                  "searchreplace visualblocks code",
                  "insertdatetime media table paste wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
              }}
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
            />
            <div style={{ paddingTop: "12px" }}>
              <Button
                onClick={() => {
                  dispatch({
                    type: HANDLE_CHANGE_POST_API_SAGA,
                    actionType: CHANGE_TASK_MODAL,
                    name: "description",
                    value: content,
                  });

                  // onClick save dispatch  CHANGE_TASK_MODAL with value: content input
                  // dispatch({
                  //   type: CHANGE_TASK_MODAL,
                  //   name: "description",
                  //   // content input
                  //   value: content,
                  // });
                  // close Editor
                  setVisibleEditor(false);
                }}
                style={{ marginRight: "5px" }}
                type="primary"
              >
                Save
              </Button>
              <Button
                // onClick  Cancel dispatch CHANGE_TASK_MODAL with value: historyContent
                onClick={() => {
                  dispatch({
                    type: HANDLE_CHANGE_POST_API_SAGA,
                    actionType: CHANGE_TASK_MODAL,
                    name: "description",
                    value: historyContent,
                  });

                  // dispatch({
                  //   type: CHANGE_TASK_MODAL,
                  //   name: "description",
                  //   // giữ lại content lúc chỉnh sửa ban đầu để kh làm thay đổi value
                  //   value: historyContent,
                  // });
                  // close Editor
                  setVisibleEditor(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              // khi người dùng bấm Cancel thì jsxDescription vẫn giữ lại value lúc đang chỉnh sửa
              setHistoryContent(taskDetailModal.description);

              // Open Editor
              setVisibleEditor(true);
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };

  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;
    const valueMax = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const averageWidth = Math.round(Number(timeTrackingSpent / valueMax) * 100);
    return (
      <div>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${averageWidth}%` }}
                aria-valuenow={timeTrackingSpent}
                aria-valuemin={timeTrackingRemaining}
                aria-valuemax={valueMax}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p className="logged">{timeTrackingSpent}h logged</p>
              <p className="estimate-time">
                {timeTrackingRemaining}h estimated
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label>Time spent (h)</label>
            <input
              className="form-control time-spent"
              name="timeTrackingSpent"
              value={timeTrackingSpent}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <label>Time remaining (h)</label>
            <input
              className="form-control time-remaining"
              name="timeTrackingRemaining"
              value={timeTrackingRemaining}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: HANDLE_CHANGE_POST_API_SAGA,
      actionType: CHANGE_TASK_MODAL,
      name,
      value,
    });
    // dispatch({ type: CHANGE_TASK_MODAL, name, value });
  };
  return (
    <div>
      {/* Search Modal */}
      <div
        className="modal fade"
        id="searchModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="searchModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-search">
          <div className="modal-content">
            <div className="modal-header">
              <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
              </div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>RECENT ISSUES</p>
              <div style={{ display: "flex" }}>
                <div className="icon">
                  <i className="fa fa-bookmark" />
                </div>
                <div>
                  <p>cyberlearn</p>
                  <p>BUG-238066</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      <div
        className="modal fade"
        id="infoModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="infoModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-info">
          <div className="modal-content">
            <div className="modal-header">
              <div className="task-title">
                <i className="fa fa-bookmark mr-2" />
                <select
                  name="typeId"
                  value={taskDetailModal.typeId}
                  onChange={handleChange}
                >
                  {arrTaskType?.map((task, index) => {
                    return (
                      <option key={index} value={task.id}>
                        {task.taskType}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div style={{ display: "flex" }} className="task-click">
                <div>
                  <i className="fab fa-telegram-plane" />
                  <span style={{ paddingRight: 20, paddingLeft: 7 }}>
                    Give feedback
                  </span>
                </div>
                <div>
                  <i className="fa fa-link" />
                  <span style={{ paddingRight: 20, paddingLeft: 7 }}>
                    Copy link
                  </span>
                </div>
                <i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-8">
                    <p className="issue">{taskDetailModal.taskName}</p>
                    <div className="description">
                      <p>Description</p>
                      <p>{renderDescription()}</p>
                    </div>

                    <div className="comment">
                      <h6>Comment</h6>
                      <div
                        className="block-comment"
                        style={{ display: "flex" }}
                      >
                        <div className="avatar">
                          <img
                            src={
                              require("../../../assets/img/download (1).jfif")
                                .default
                            }
                            alt="avatar"
                          />
                        </div>
                        <div className="input-comment">
                          <input type="text" placeholder="Add a comment ..." />
                          <span style={{ fontWeight: 500, color: "gray" }}>
                            Pro tip:
                          </span>
                          <span style={{ marginLeft: 5 }}>
                            press
                            <span
                              style={{
                                fontWeight: "bold",
                                background: "rgb(223, 225, 230)",
                                color: "rgb(23, 43, 77)",
                                margin: "0px 4px",
                                padding: " 0px 4px",
                              }}
                            >
                              M
                            </span>
                            to comment
                          </span>
                        </div>
                      </div>
                      <div className="lastest-comment">
                        <div className="comment-item">
                          <div
                            className="display-comment"
                            style={{ display: "flex" }}
                          >
                            <div className="avatar">
                              <img
                                src={
                                  require("../../../assets/img/download (1).jfif")
                                    .default
                                }
                                alt="avatar"
                              />
                            </div>
                            <div>
                              <div>
                                <p style={{ marginBottom: 5 }}>
                                  Lord Gaben <span>a month ago</span>
                                </p>
                                <p style={{ marginBottom: 5 }}>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipisicing elit. Repellendus tempora ex
                                  voluptatum saepe ab officiis alias totam ad
                                  accusamus molestiae?
                                </p>
                              </div>
                              <div>
                                <span style={{ color: "#929398" }}>Edit</span>•
                                <span style={{ color: "#929398" }}>Delete</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="status">
                      <h6>STATUS</h6>
                      <select
                        name="statusId"
                        style={{ cursor: "pointer" }}
                        className="custom-select"
                        value={taskDetailModal.statusId}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        {arrStatus.map((status, index) => {
                          return (
                            <option key={index} value={status.statusId}>
                              {status.statusName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="assignees" style={{ marginBottom: 15 }}>
                      <h6>ASSIGNEES</h6>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          webkitBoxAlign: "center",
                        }}
                      >
                        {taskDetailModal.assigness?.map((user, index) => {
                          return (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                              }}
                              className="item"
                            >
                              <div className="avatar">
                                <img src={user.avatar} alt={user.avatar} />
                              </div>
                              <p
                                className="name mt-1 ml-2"
                                onClick={() => {
                                  dispatch({
                                    type: HANDLE_CHANGE_POST_API_SAGA,
                                    actionType: REMOVE_USER_ASSIGNEES,
                                    userId: user.id,
                                  });

                                  // dispatch({
                                  //   type: REMOVE_USER_ASSIGNEES,
                                  //   userId: user.id,
                                  // });
                                }}
                              >
                                {user.name}
                                <i
                                  className="fa fa-times"
                                  style={{ margin: " 0 10px " }}
                                />
                              </p>
                            </div>
                          );
                        })}

                        <div className="assignees__member">
                          <Select
                            name="lstUser"
                            style={{
                              width: "100%",
                            }}
                            // placeholder="Search"
                            options={projectDetail.members
                              ?.filter((member) => {
                                let index =
                                  taskDetailModal?.assigness.findIndex(
                                    (user) => user.id === member.userId
                                  );
                                return index !== -1 ? false : true;
                              })
                              ?.map((member, index) => {
                                return {
                                  label: member.name,
                                  value: member.userId.toString(),
                                };
                              })}
                            value={divContent()}
                            optionFilterProp="label"
                            onSelect={(value) => {
                              const userSelect = projectDetail.members.find(
                                // userId là số, value là chuỗi nên sd 2 dấu ==
                                (member) => member.userId == value
                              );
                              const userSelected = {
                                ...userSelect,
                                id: userSelect.userId,
                              };
                              dispatch({
                                type: HANDLE_CHANGE_POST_API_SAGA,
                                actionType: CHANGE_ASSIGNEES,
                                userSelected,
                              });

                              // dispatch reducer
                              // dispatch({
                              //   type: CHANGE_ASSIGNEES,
                              //   userSelected,
                              // });
                            }}
                          ></Select>
                        </div>
                      </div>
                    </div>

                    <div className="priority" style={{ marginBottom: 20 }}>
                      <h6>PRIORITY</h6>
                      <select
                        name="priorityId"
                        style={{ cursor: "pointer" }}
                        className="form-control"
                        value={taskDetailModal.priorityId}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        {arrPriority.map((item, index) => {
                          return (
                            <option key={index} value={item.priorityId}>
                              {item.priority}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="estimate">
                      <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                      <input
                        name="originalEstimate"
                        type="text"
                        className="estimate-hours"
                        value={taskDetailModal.originalEstimate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="time-tracking">
                      <h6>TIME TRACKING</h6>
                      {renderTimeTracking()}
                    </div>
                    <div style={{ color: "#929398" }}>
                      Create at a month ago
                    </div>
                    <div style={{ color: "#929398" }}>
                      Update at a few seconds ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
