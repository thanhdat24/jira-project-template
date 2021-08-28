import React, { useRef } from "react";

import { Editor } from "@tinymce/tinymce-react";

export default function ProjectSettings(props) {
  const handleEditorChange = (e) => {
    console.log("Content was updated:", e.target.getContent());
  };

  return (
    <div className="project-settings container">
      <div>
        Projects<span>/</span>singularity 1.5
        <span>/</span>Project Details
      </div>
      <h1 className="project-settings__title">Project Details</h1>
      <form className="container">
        <div className="form-group">
          <label>Name</label>
          <div>
            <input name="projectName" type="text" className="form-control" />
          </div>
        </div>
        <div className="form-group">
          <label>URL</label>
          <div>
            <input
              name="projectName"
              type="text"
              className="form-control"
              value="https://www.atlassian.com/software/jira"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <div>
            <Editor
              initialValue="<p>Initial content</p>"
              init={{
                height: 500,
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
              onChange={handleEditorChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Project Category</label>
          <select name="categoryId" className="form-control">
            <option>Software</option>
            <option>Marketing</option>
            <option>Business</option>
          </select>
        </div>
        <button
          style={{ backgroundColor: "rgb(0, 82, 204)" }}
          type="submit"
          class="btn btn-primary mt-3"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
