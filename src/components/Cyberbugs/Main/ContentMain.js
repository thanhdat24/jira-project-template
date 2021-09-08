import React from "react";

export default function ContentMain(props) {
  const { projectDetail } = props;
  const renderCardTaskList = () => {
    return projectDetail.lstTask?.map((lstTask, index) => {
      return (
        <li
          key={index}
          className="card"
          style={{ width: "17rem", height: "auto" }}
        >
          <div className="card-header">{lstTask.statusName}</div>
          <ul className="list-group list-group-flush">
            {lstTask.lstTaskDeTail?.map((task, index) => {
              return (
                <li
                  key={index}
                  className="list-group-item"
                  data-toggle="modal"
                  data-target="#infoModal"
                  style={{ cursor: "pointer" }}
                >
                  <p>{task.taskName}</p>
                  <div className="block" style={{ display: "flex" }}>
                    <div className="block-left">
                      <p className="text-danger">
                        {task.priorityTask.priority}
                      </p>
                    </div>
                    <div className="block-right">
                      <div className="avatar-group" style={{ display: "flex" }}>
                        <div className="avatar">
                          {task.assigness?.map((member, index) => {
                            return (
                              <img
                                key={index}
                                src={member.avatar}
                                alt={member.avatar}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </li>
      );
    });
  };
  return (
    <div className="content" style={{ display: "flex" }}>
      {renderCardTaskList()}
    </div>
  );
}

// <div className="card" style={{ width: "17rem", height: "25rem" }}>
//       <div className="card-header">SELECTED FOR DEVELOPMENT 2</div>
//       <ul className="list-group list-group-flush">
//         <li className="list-group-item">Cras justo odio</li>
//         <li className="list-group-item">Dapibus ac facilisis in</li>
//       </ul>
//     </div>
//     <div className="card" style={{ width: "17rem", height: "25rem" }}>
//       <div className="card-header">IN PROGRESS 2</div>
//       <ul className="list-group list-group-flush">
//         <li className="list-group-item">Cras justo odio</li>
//         <li className="list-group-item">Dapibus ac facilisis in</li>
//       </ul>
//     </div>
//     <div className="card" style={{ width: "17rem", height: "25rem" }}>
//       <div className="card-header">DONE 3</div>
//       <ul className="list-group list-group-flush">
//         <li className="list-group-item">Cras justo odio</li>
//         <li className="list-group-item">Dapibus ac facilisis in</li>
//         <li className="list-group-item">Vestibulum at eros</li>
//       </ul>
//     </div>
