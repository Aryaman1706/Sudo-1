import {
  CLEAR_ACTIVE_FILE,
  CREATE_NEW_FILE,
  CREATE_NEW_FOLDER,
  SET_ACTIVE_FILE,
  WRITE_CODE,
} from "../types";
import store from "../store";

// * Create a folder
export const createFolder = (folder) => {
  return {
    type: CREATE_NEW_FOLDER,
    payload: folder,
  };
};

// * Create a file
export const createFile = (file, currentFolder) => {
  const files = store.getState().code.fileStructure;
  const newFiles = files.map((item) => {
    if (item.folder === currentFolder) {
      item.files.push(file);
      return item;
    } else {
      return item;
    }
  });
  return {
    type: CREATE_NEW_FILE,
    payload: newFiles,
  };
};

// * Set Active File
export const setActiveFile = (file) => {
  return {
    type: SET_ACTIVE_FILE,
    payload: file,
  };
};

// * Clear Active File
export const ClearActiveFile = () => {
  return {
    type: CLEAR_ACTIVE_FILE,
  };
};

// * Write Code
export const writeCode = (code) => {
  return {
    type: WRITE_CODE,
    payload: code,
  };
};
