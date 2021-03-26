import { useEffect, useRef } from "react"
import { MonacoBinding } from "./y-monaco"

const CodeEditor = ({ monaco, YDoc, awareness }) => {
    const editorDiv = useRef(null);
    const addFile = (name) => {
        return YDoc.getText(name); 
    };

    useEffect(() => {
        const editor = monaco.editor.create(editorDiv.current, {
            value: "",
            language: "javascript",
            theme: "vs-dark"
        });

         new MonacoBinding(addFile("file"), editor.getModel(), new Set([editor]), awareness);
    }, [])

    return (
        <>
            <div ref={editorDiv}></div>
        </>
    )
}

export default CodeEditor
