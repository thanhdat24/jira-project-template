import { USER_SIGNIN_API } from "../constants/Cyberbugs/Cyberbug";

export const siginCyberbugsAction = (email, password, history) => ({
  type: USER_SIGNIN_API,
  userLogin: {
    email: email,
    password: password,
    history: history,
  },
});
