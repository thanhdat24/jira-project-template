import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/settingSystem";

import Axios from "axios";

export const userService = {
  getUser: (keyWord) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Users/getUser?keyword=${keyWord}`,
      method: "GET",
      data: keyWord,
      // token yếu cầu từ back-end chứng minh user đã login
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  },
  assignUserProject: (userProject) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/assignUserProject`,
      method: "POST",
      data: userProject,
      // token yếu cầu từ back-end chứng minh user đã login
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  },
  removeUserProject: (userProject) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/removeUserFromProject `,
      method: "POST",
      data: userProject,
      // token yếu cầu từ back-end chứng minh user đã login
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  },
  getUserByProjectId: (idProject) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Users/getUserByProjectId?idProject=${idProject}`,
      method: "GET",
      data: idProject,
      // token yếu cầu từ back-end chứng minh user đã login
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  },
};
