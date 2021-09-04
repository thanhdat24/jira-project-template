import { CheckSquareOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { Select } from "antd";

export default function FormCreateTask(props) {
  const { Option } = Select;

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }
  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }
  const [size, setSize] = React.useState("default");

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
          <option value="10">Project A</option>
          <option value="11">Project B</option>
        </select>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-6">
            <label>Task Type</label>
            <select name="typeId" className="form-control">
              <option>Task</option>
              <option>Bug</option>
            </select>
          </div>
          <div class="col-6">
            <label>Priority</label>
            <select name="typeId" className="form-control">
              <option>Medium</option>
              <option>Hight</option>
              <option>Low</option>
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
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
