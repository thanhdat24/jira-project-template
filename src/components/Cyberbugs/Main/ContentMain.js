import {
  GET_TASK_DETAIL_SAGA,
  UPDATE_STATUS_TASK_SAGA,
} from "../../../redux/constants/Cyberbugs/Cyberbug";
import React from "react";
import { useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function ContentMain(props) {
  const dispatch = useDispatch();
  const { projectDetail } = props;
  const handleDragEnd = (result) => {
    let { projectId, taskId } = JSON.parse(result.draggableId);
    console.log("result", result);
    let { source, destination } = result;
    if (!result.destination) return;

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    // Gọi API updateStatus
    dispatch({
      type: UPDATE_STATUS_TASK_SAGA,
      taskStatusUpdate: {
        taskId: taskId,
        statusId: destination.droppableId,
        projectId: projectId,
      },
    });
  };

  const renderCardTaskList = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {" "}
        {projectDetail.lstTask?.map((lstTask, index) => {
          return (
            <Droppable key={index} droppableId={lstTask.statusId}>
              {(provided) => {
                return (
                  <div
                    key={index}
                    className="card"
                    style={{ width: "17rem", height: "auto" }}
                  >
                    <div className="card-header">{lstTask.statusName}</div>
                    <ul
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="list-group list-group-flush"
                      style={{ height: "100%" }}
                    >
                      {lstTask.lstTaskDeTail.map((task, index) => {
                        return (
                          <Draggable
                            key={task.taskId.toString()}
                            index={index}
                            draggableId={JSON.stringify({
                              projectId: task.projectId,
                              taskId: task.taskId,
                            })}
                          >
                            {(provided) => {
                              return (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  key={index}
                                  className="list-group-item"
                                  data-toggle="modal"
                                  data-target="#infoModal"
                                  // style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    dispatch({
                                      type: GET_TASK_DETAIL_SAGA,
                                      taskId: task.taskId,
                                    });
                                  }}
                                >
                                  <p>{task.taskName}</p>
                                  <div
                                    className="block"
                                    style={{ display: "flex" }}
                                  >
                                    <div className="block-left">
                                      <p className="text-danger">
                                        {task.priorityTask.priority}
                                      </p>
                                    </div>
                                    <div className="block-right">
                                      <div
                                        className="avatar-group"
                                        style={{ display: "flex" }}
                                      >
                                        <div className="avatar">
                                          {task.assigness?.map(
                                            (member, index) => {
                                              return (
                                                <img
                                                  key={index}
                                                  src={member.avatar}
                                                  alt={member.avatar}
                                                />
                                              );
                                            }
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  </div>
                );
              }}
            </Droppable>
          );
        })}{" "}
      </DragDropContext>
    );
  };
  return (
    <div className="content" style={{ display: "flex" }}>
      {renderCardTaskList()}
    </div>
  );
}
