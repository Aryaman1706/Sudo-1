import {
  CRDT_SET_EDITOR,
  CRDT_SET_BINDING,
  CRDT_SET_ACTIVE_FILE,
} from "../types";

export const setEditor = (editor) => (dispatch) => {
  dispatch({
    type: CRDT_SET_EDITOR,
    payload: editor,
  });
};

export const setBinding = (binding) => (dispatch) => {
  dispatch({
    type: CRDT_SET_BINDING,
    payload: binding,
  });
};

export const setActiveFile = (file) => (dispatch) => {
  dispatch({
    type: CRDT_SET_ACTIVE_FILE,
    payload: file,
  });
};
