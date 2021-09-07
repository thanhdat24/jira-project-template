import { baseService } from "./baseService";

export class StatusService extends baseService {
  constructor() {
    super();
  }
  getAllStatus = () => {
    return this.get("Status/getAll");
  };
}

export const statusService = new StatusService();
