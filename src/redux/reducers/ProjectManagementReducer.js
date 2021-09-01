import { GET_LIST_PROJECT } from "../constants/Cyberbugs/Cyberbug";

const stateDefault = {
  projectList: [
    // {
    //   id: "1",
    //   projectName: "abc",
    //   description: `<p style="color:red">123</p>`,
    // },
  ],
};

export const ProjectManagementReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_PROJECT: {
      state.projectList = action.projectList;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
