import { baseService } from "./baseService";

export class TaskService extends baseService {
  constructor() {
    super();
  }
  createTask = (taskObject) => {
    return this.post("Project/createTask", taskObject);
  };
  getTaskDetail = (taskId) => {
    return this.get(`Project/getTaskDetail?taskId=${taskId}`);
  };
  updateStatus = (taskStatusUpdate) => {
    return this.put("Project/updateStatus", taskStatusUpdate);
  };
}

export const taskService = new TaskService();
