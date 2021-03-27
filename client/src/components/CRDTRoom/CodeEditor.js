import { useEffect, useRef, useState } from "react";
import { MonacoBinding } from "./y-monaco";

const CodeEditor = ({ monaco, YDoc, awareness }) => {
  const editorDiv = useRef(null);
  const [editor, setEditor] = useState(null);
  const [binding, setBinding] = useState(null);
  const [activeFile, setActiveFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [yMap, setMap] = useState(null);

  const [newFile, setNewFile] = useState(null);

  const addFile = (name) => {
    const yText = YDoc.getText(name);
    yMap.set(name, yText);
    setFiles((prev) => [...prev, name]);
    setActiveFile(name);
  };

  useEffect(() => {
    if (!yMap) {
      const newYmap = YDoc.getMap("files");
      newYmap.observe();
      setMap(newYmap);
    }
    if (!editor) {
      const newEditor = monaco.editor.create(editorDiv.current, {
        value: "",
        language: "javascript",
        theme: "vs-dark",
      });

      setEditor(newEditor);
    }
  }, []);

  // useEffect(() => {
  //   if (yMap) {
  //     yMap.observe();
  //   }
  // }, [yMap]);

  // useEffect(() => {
  //   if (editor && !activeFile) {
  //     addFile("index");
  //   }
  // }, [editor]);

  useEffect(() => {
    if (editor && activeFile && yMap && yMap.get(activeFile)) {
      if (binding) {
        binding.destroy();
      }
      const newBinding = new MonacoBinding(
        yMap.get(activeFile),
        editor.getModel(),
        new Set([editor])
      );

      setBinding(newBinding);
    }
  }, [activeFile]);

  return (
    <>
      <div ref={editorDiv} style={{ height: "300px", marginTop: "10px" }}></div>
      <input value={newFile} onChange={(e) => setNewFile(e.target.value)} />
      <button onClick={(e) => addFile(newFile)}>Create</button>
      {files.map((t) => (
        <p onClick={(e) => setActiveFile(t)}>{t}</p>
      ))}
    </>
  );
};

export default CodeEditor;
