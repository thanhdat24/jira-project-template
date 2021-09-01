import * as Yup from "yup";

import {
  GET_ALL_PROJECT_CATEGORY_SAGA,
  SET_SUBMIT_EDIT_PROJECT,
  UPDATE_PROJECT_SAGA,
} from "../../../redux/constants/Cyberbugs/Cyberbug";
import { connect, useDispatch, useSelector } from "react-redux";

import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { useEffect } from "react";
import { withFormik } from "formik";

function FormEditProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
  const dispatch = useDispatch();
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  // const submitForm = (e) => {
  //   e.preventDefault();
  //   alert("Submit success!");
  // };
  useEffect(() => {
    // Gọi API load project category
    dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });
    // Load sự kiện submit lên drawer nút submit
    dispatch({ type: SET_SUBMIT_EDIT_PROJECT, submitFunction: handleSubmit });
  }, []);

  const handleEditorChange = (content) => {
    setFieldValue("description", content);
  };
  return (
    <form className="container FormEdit-Project" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <label>Id</label>
          <input
            value={values.id}
            disabled
            name="id"
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-4">
          <label>Project name</label>
          <input
            value={values.projectName}
            name="projectName"
            type="text"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="col-4">
          <label>Project category</label>
          <select
            className="form-control"
            name="categoryId"
            value={values.categoryId}
          >
            {arrProjectCategory?.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-12 mt-4">
          <label>Description</label>
          <div>
            <Editor
              value={values.description}
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
    </form>
  );
}
const EditProjectForm = withFormik({
  // thuộc tính enableReinitialize: khi mỗi lần props của redux thay đổi thì nó lặp tức bidding lại giá trị obj
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      id: projectEdit.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    // khi người dùng bấm submit => đưa dữ liệu về backend thông qua API

    // Gọi saga
    props.dispatch({
      type: UPDATE_PROJECT_SAGA,
      projectUpdate: values,
    });
  },

  displayName: "projectSettingsFormik",
})(FormEditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.ProjectEditReducer.projectEdit,
});
export default connect(mapStateToProps)(EditProjectForm);
