import {
  GET_ALL_PROJECT,
  GET_LIST_PROJECT,
} from "../constants/Cyberbugs/Cyberbug";

const stateDefault = {
  projectList: [],
  arrProject: [], // Get all project to dropdown
};

export const ProjectManagementReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_PROJECT: {
      state.projectList = action.projectList;
      return { ...state };
    }
    case GET_ALL_PROJECT: {
      return { ...state, arrProject: action.arrProject };
    }
    default:
      return { ...state };
  }
};
