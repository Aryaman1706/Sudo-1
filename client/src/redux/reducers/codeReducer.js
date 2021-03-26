/* eslint-disable import/no-anonymous-default-export */
import {
  CLEAR_ACTIVE_FILE,
  CREATE_NEW_FILE,
  CREATE_NEW_FOLDER,
  SET_ACTIVE_FILE,
  WRITE_CODE,
} from "../types";

const defaultState = {
  fileStructure: [
    {
      folder: "src",
      files: [
        {
          name: "index.js",
          code: "// Write your code here",
        },
      ],
    },
  ],
  activeFile: { name: "index.js", code: "// Write your code here" },
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_NEW_FOLDER:
      return {
        ...state,
        fileStructure: [...state.fileStructure, action.payload],
      };
    case CREATE_NEW_FILE:
      return {
        ...state,
        fileStructure: action.payload,
      };
    case SET_ACTIVE_FILE:
      return {
        ...state,
        activeFile: action.payload,
      };
    case CLEAR_ACTIVE_FILE:
      return {
        ...state,
        activeFile: null,
      };
    case WRITE_CODE:
      return {
        ...state,
        activeFile: { ...state.activeFile, code: action.payload },
      };
    default:
      return state;
  }
};
