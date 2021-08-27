import Axios from "axios";
import { DOMAIN_CYBERBUG } from "../util/constants/settingSystem";

export const cyberbugsService = {
  signinCyberBugs: (userLogin) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/users/signin`,
      method: "POST",
      data: userLogin,
    });
  },
};
