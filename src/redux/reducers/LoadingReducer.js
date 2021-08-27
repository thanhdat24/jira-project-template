import {
  DiSPLAY_LOADING,
  HIDE_LOADING,
} from "../constants/Loading/LoadingConst";

const initialState = {
  isLoading: false,
};

export const LoadingComponent = (state = initialState, action) => {
  switch (action.type) {
    case DiSPLAY_LOADING:
      state.isLoading = true;
      return { ...state };
    case HIDE_LOADING:
      state.isLoading = false;
      return { ...state };
    default:
      return state;
  }
};
export default LoadingComponent;
