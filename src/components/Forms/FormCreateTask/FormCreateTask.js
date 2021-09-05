import {
  GET_ALL_PRIORITY_SAGA,
  GET_ALL_PROJECT_SAGA,
  GET_ALL_TASK_TYPE_SAGA,
} from "../../../redux/constants/Cyberbugs/Cyberbug";
import React, { useEffect, useState } from "react";
import { Select, Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { CheckSquareOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";

const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
export default function FormCreateTask(props) {
  const dispatch = useDispatch();
  const { arrProject } = useSelector((state) => state.ProjectManagementReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  console.log("arrProject", arrProject);
  const [size, setSize] = React.useState("default");
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  // hook
  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
  }, []);
  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }

  // const {
  //   values,
  //   touched,
  //   errors,
  //   handleChange,
  //   handleBlur,
  //   handleSubmit,
  //   setFieldValue,
  // } = props;
  const handleEditorChange = (content) => {
    // setFieldValue("description", content);
  };
  return (
    <div className="container FormCreateTask-Project">
      <div className="form-group">
        <label>Project Type</label>
        <select name="projectId" className="form-control">
          {arrProject.map((project, index) => {
            return (
              <option value={project.id} key={index}>
                {project.projectName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <label>Task Type</label>
            <select name="typeId" className="form-control">
              {arrTaskType.map((task, index) => {
                return (
                  <option key={index} value={task.id}>
                    {task.taskType}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-6">
            <label>Priority</label>
            <select name="typeId" className="form-control">
              {arrPriority.map((item, index) => {
                return (
                  <option key={index} value={item.priorityId}>
                    {item.priority}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <label>Assignees</label>
            <Select
              mode="tags"
              size={size}
              placeholder="Please select"
              defaultValue={["a10", "c12"]}
              onChange={handleChange}
              style={{ width: "100%" }}
            >
              {children}
            </Select>
          </div>
          <div className="col-6">
            <label>Original Estimate (h)</label>
            <input
              name="originalEstimate"
              type="number"
              defaultValue="0"
              className="form-control"
            />
          </div>
        </div>
        <div className="row my-4">
          <div className="col-6">
            <label>Time Tracking</label>
            {/* tooltipVisible: hiện thị value trên đầu  */}
            <Slider
              style={{ marginBottom: 0 }}
              defaultValue={30}
              value={timeTracking.timeTrackingSpent}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
            />
            <div className="row">
              <div className="col-6 text-left " style={{ fontWeight: 500 }}>
                {timeTracking.timeTrackingSpent} logged
              </div>
              <div className="col-6 text-right" style={{ fontWeight: 500 }}>
                {timeTracking.timeTrackingRemaining} remaining
              </div>
            </div>
          </div>
          <div className="col-3">
            <label>Time Spent (h)</label>
            <input
              name="timeTrackingSpent"
              defaultValue="0"
              min="0"
              type="number"
              className="form-control"
              onChange={(e) => {
                setTimeTracking({
                  ...timeTracking,
                  timeTrackingSpent: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-3">
            <label>Time Remaining (h)</label>
            <input
              name="timeTrackingRemaining"
              defaultValue="0"
              min="0"
              type="number"
              className="form-control"
              onChange={(e) => {
                setTimeTracking({
                  ...timeTracking,
                  timeTrackingRemaining: e.target.value,
                });
              }}
            />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>Description</label>
        <div>
          <Editor
            // value={values.description}
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
            onEditorChange={handleEditorChange}
          />
        </div>
      </div>
    </div>
  );
}
