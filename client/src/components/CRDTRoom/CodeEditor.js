import { useEffect, useRef, useReducer } from "react";
import { MonacoBinding } from "./y-monaco";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
    .show
})

const CodeEditor = ({ monaco, YDoc, awareness }) => {
  const bReducer = (state, action) => {
    switch (action.type) {
      case "SET_BINDING":
        return { binding: action.payload };
      default:
        throw new Error();
    }
  };
  const [bState, bDispatch] = useReducer(bReducer, { binding: null });

  const eReducer = (state, action) => {
    switch (action.type) {
      case "SET_EDITOR":
        return { editor: action.payload };
      default:
        throw new Error();
    }
  };
  const [eState, eDispatch] = useReducer(eReducer, { editor: null });

  const fReducer = (state, action) => {
    switch (action.type) {
      case "SET_ACTIVE":
        return { active_file: action.payload };
      default:
        throw new Error();
    }
  };
  const [fState, fDispatch] = useReducer(fReducer, { active_file: null });

  const editorDiv = useRef(null);

  const addFile = (name) => {
    return YDoc.getText(name);
  };

  const bindText = (yText) => {
    if (!bState.binding) {
      new MonacoBinding(
        yText,
        eState.editor.getModel(),
        new Set([eState.editor]),
        awareness
      );
    } else {
      bState.binding.destroy();

      const newBinding = new MonacoBinding(
        yText,
        eState.editor.getModel(),
        new Set([eState.editor]),
        awareness
      );
      bDispatch({ type: "SET_BINDING", payload: newBinding });
    }
  };

  useEffect(() => {
    if (!eState.editor) {
      const editor = monaco.editor.create(editorDiv.current, {
        value: "",
        language: "javascript",
        theme: "vs-dark",
      });

      eDispatch({ type: "SET_EDITOR", payload: editor });
      bindText(addFile("testing"));
    }
  }, []);

  return (
    <>
      <div ref={editorDiv} style={{ height: "300px", marginTop: "10px" }}></div>
    </>
  );
};

export default CodeEditor;
