import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { SET_SUBMIT_EDIT_PROJECT } from "../../../redux/constants/Cyberbugs/Cyberbug";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function FormEditProject(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_SUBMIT_EDIT_PROJECT, submitFunction: handleSubmit });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submit success!");
  };
  const handleEditorChange = (content) => {
    // setFieldValue("description", content);
  };
  return (
    <form className="container FormEdit-Project" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <label>Id</label>
          <input disabled name="id" type="text" className="form-control" />
        </div>
        <div className="col-4">
          <label>Project name</label>
          <input name="projectName" type="text" className="form-control" />
        </div>
        <div className="col-4">
          <label>Project category</label>
          <input name="category" type="text" className="form-control" />
        </div>
        <div className="col-12 mt-4">
          <label>Description</label>
          <div>
            <Editor
              initialValue="<p>Initial content</p>"
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
