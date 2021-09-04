import { PUT_PROJECT_DETAIL } from "../constants/Cyberbugs/Cyberbug";

const initialState = {
  projectDetail: {},
};

export const ProjectDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_PROJECT_DETAIL: {
      state.projectDetail = action.projectDetail;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
