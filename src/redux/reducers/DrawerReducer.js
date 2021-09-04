import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_FORM_CREATE_TASK,
  OPEN_FORM_EDIT_PROJECT,
  SET_SUBMIT_EDIT_PROJECT,
} from "../constants/Cyberbugs/Cyberbug";

import React from "react";

const stateDefault = {
  visible: false,
  title: "",
  componentContent: <p>default content</p>,
  callBackSubmit: () => {
    alert("Click !");
  },
};

export const DrawerReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case OPEN_DRAWER: {
      return { ...state, visible: true };
    }
    case CLOSE_DRAWER: {
      return {
        ...state,
        visible: false,
      };
    }
    case OPEN_FORM_EDIT_PROJECT: {
      return {
        ...state,
        visible: true,
        componentContent: action.Component,
        title: action.title,
      };
    }
    case SET_SUBMIT_EDIT_PROJECT: {
      return { ...state, callBackSubmit: action.submitFunction };
    }
    case OPEN_FORM_CREATE_TASK: {
      return {
        ...state,
        visible: true,
        componentContent: action.Component,
        title: action.title,
      };
    }
    default:
      return { ...state };
  }
};
