import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/settingSystem";

import Axios from "axios";

export const cyberbugsService = {
  signinCyberBugs: (userLogin) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/users/signin`,
      method: "POST",
      data: userLogin,
    });
  },
  getAllProjectCategory: () => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/ProjectCategory`,
      method: "GET",
    });
  },
  createProject: (newProject) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/createProject`,
      method: "POST",
      data: newProject,
    });
  },
  createProjectAuthorization: (newProject) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/createProjectAuthorize`,
      method: "POST",
      data: newProject,
      // token yếu cầu từ back-end chứng minh user đã login
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  },
  getListProject: () => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/getAllProject`,
      method: "GET",
      // token yếu cầu từ back-end chứng minh user đã login
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  },
  updateProject: (projectUpdate) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/updateProject?projectId=${projectUpdate.id}`,
      method: "PUT",
      data: projectUpdate,
      // token yếu cầu từ back-end chứng minh user đã login
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  },
  deleteProject: (id) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/deleteProject?projectId=${id}`,
      method: "DELETE",
      // token yếu cầu từ back-end chứng minh user đã login
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  },
};
