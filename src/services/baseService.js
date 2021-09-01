import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/settingSystem";

import Axios from "axios";

export class baseService {
  // put json về phía backend
  put = (url, modal) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: "PUT",
      data: modal,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  post = (url, modal) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: "POST",
      data: modal,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  get = (url) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: "GET",

      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  delete = (url) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: "DELETE",

      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
}
