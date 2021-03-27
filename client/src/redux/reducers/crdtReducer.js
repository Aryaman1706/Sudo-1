import {
  CRDT_SET_EDITOR,
  CRDT_SET_BINDING,
  CRDT_SET_ACTIVE_FILE,
} from "../types";

const defaultState = {
  editor: null,
  binding: null,
  activeFile: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  switch (action.type) {
    case CRDT_SET_EDITOR:
      return {
        ...state,
        editor: action.payload,
      };
    case CRDT_SET_BINDING:
      return {
        ...state,
        binding: action.payload,
      };
    case CRDT_SET_ACTIVE_FILE:
      return {
        ...state,
        activeFile: action.payload,
      };
    default:
      return state;
  }
};
