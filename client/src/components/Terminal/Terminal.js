import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "./Terminal.css";

const TerminalComponent = ({ socket }) => {
  const term = new Terminal();
  const fitAddon = new FitAddon();
  const termRef = useRef(null);
  // const shellprompt = "$ ";
  useEffect(() => {
    term.open(termRef.current);
    term.loadAddon(fitAddon);
    fitAddon.fit();
    // term.writeln("Welcome to sudo");
    // term.writeln("");

    term.onData((data) => {
      socket.emit("set", data);
    });

    socket.on("get", (data) => {
      term.write(data);
    });

    // term.setOption("cursorBlink", true);
    // term.onKey((key) => {
    //   const char = key.domEvent.key;
    //   if (char === "Enter") {
    //     prompt();
    //   } else if (char === "Backspace") {
    //     term.write("\b \b");
    //   } else {
    //     term.write(char);
    //   }
    // });
    // prompt();
  }, []);

  // const prompt = () => {
  //   term.write("\r\n" + shellprompt);
  // };

  return <div ref={termRef} id="xterm-container"></div>;
};

export default TerminalComponent;
