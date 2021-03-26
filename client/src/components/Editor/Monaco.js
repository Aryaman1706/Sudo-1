import loader from "@monaco-editor/loader"
import { useState, useEffect } from "react"
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket"
import CodeEditor from "./CodeEditor";

const Monaco = ({ roomName }) => {
    const [ awareness, setAwareness ] = useState(null);
    const [ m, setM ] = useState(null);
    const [ doc, setDoc ] = useState(null);

    useEffect(() => {
        if(!m && !doc && !awareness){
            const yDoc = new Y.Doc();
            setDoc(yDoc);
            
            const provider = new WebsocketProvider("ws://localhost:7000", roomName, yDoc);
            setAwareness(provider.awareness);

            loader.init().then(monaco => {
                setM(monaco);
            })
        }

    }, [])

    return (
        <>
            { m && doc && awareness ? <CodeEditor monaco={m} YDoc={doc} awareness={awareness} /> : <h2>Loading...</h2>}
        </>
    )
}

export default Monaco
