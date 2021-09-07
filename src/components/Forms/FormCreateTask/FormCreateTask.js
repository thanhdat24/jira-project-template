import * as Yup from "yup";

import {
  CREATE_TASK_SAGA,
  GET_ALL_PRIORITY_SAGA,
  GET_ALL_PROJECT_SAGA,
  GET_ALL_TASK_TYPE_SAGA,
  GET_USER_API,
  UPDATE_PROJECT_SAGA,
} from "../../../redux/constants/Cyberbugs/Cyberbug";
import React, { useEffect, useState } from "react";
import { Select, Slider } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";

import { CheckSquareOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { GET_ALL_STATUS_SAGA } from "../../../redux/constants/Cyberbugs/StatusConstants";
import { withFormik } from "formik";

function FormCreateTask(props) {
  const dispatch = useDispatch();
  const { arrProject } = useSelector((state) => state.ProjectManagementReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { userSearch } = useSelector(
    (state) => state.UserLoginCyberBugsReducer
  );
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const useOptions = userSearch.map((item, index) => {
    return { value: item.userId, label: item.name };
  });
  // console.log("arrProject", arrProject);
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
    dispatch({ type: GET_USER_API, keyWord: "" });
    dispatch({ type: GET_ALL_STATUS_SAGA });
  }, []);

  // Do connect với withformik => component có các props
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  return (
    <form className="container FormCreateTask-Project" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Project Type</label>
        <select
          name="projectId"
          className="form-control"
          onChange={handleChange}
        >
          {arrProject.map((project, index) => {
            return (
              <option value={project.id} key={index}>
                {project.projectName}
              </option>
            );
          })}
        </select>
      </div>
      <div class="row">
        <div class="col-6">
          <div className="form-group">
            <label>Task Name</label>
            <input
              name="taskName"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>
        <div class="col-6">
          <div className="form-group">
            <label>Status</label>
            <select
              name="statusId"
              className="form-control"
              onChange={handleChange}
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
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <label>Task Type</label>
            <select
              name="typeId"
              className="form-control"
              onChange={handleChange}
            >
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
            <select
              name="priorityId"
              className="form-control"
              onChange={handleChange}
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
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <label>Assignees</label>
            <Select
              mode="multiple"
              size={size}
              options={useOptions}
              placeholder="Please select"
              // defaultValue={["admin", "Tester"]}
              optionFilterProp="label"
              onChange={(values) => {
                setFieldValue("listUserAsign", values);
              }}
              style={{ width: "100%" }}
              onSearch={(value) => {
                // console.log("value", value);
              }}
            ></Select>
          </div>
          <div className="col-6">
            <label>Original Estimate (h)</label>
            <input
              name="originalEstimate"
              type="number"
              defaultValue="0"
              className="form-control"
              onChange={handleChange}
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
                setFieldValue("timeTrackingSpent", e.target.value);
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
                setFieldValue("timeTrackingSpent", e.target.value);
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
            onEditorChange={(content, editor) => {
              setFieldValue("description", content);
            }}
          />
        </div>
      </div>
      <button className="btn btn-success">Submit</button>
    </form>
  );
}

const CreateTaskForm = withFormik({
  // thuộc tính enableReinitialize: khi mỗi lần props của redux thay đổi thì nó lặp tức bidding lại giá trị obj
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: 1,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: 0,
      typeId: 0,
      priorityId: 0,
    };
  },
  // validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    // khi người dùng bấm submit => đưa dữ liệu về backend thông qua API
    props.dispatch({ type: CREATE_TASK_SAGA, taskObject: values });
    // Gọi saga
  },

  displayName: "createTaskForm",
})(FormCreateTask);

export default connect()(CreateTaskForm);
