const httpServer = require("http").createServer();

const endpoint = process.env.ROOM_ID
  ? `/${process.env.ROOM_ID}/`
  : "/socket.io/";
const io = require("socket.io")(httpServer, {
  path: endpoint,
  cors: {
    origin: "*",
  },
});

const terminal = io.of("/pty");

const pty = require("node-pty");

const ptyProcess = pty.spawn("bash", [], {
  name: "PTY",
  cols: 80,
  rows: 30,
  env: process.env,
});

terminal.on("connection", (socket) => {
  console.log("connected");

  socket.on("set", (data) => {
    console.log("set ", data);
    ptyProcess.write(data);
  });

  ptyProcess.onExit(() => {
    // TODO
  });

  ptyProcess.onData((data) => {
    console.log("get ", data);
    terminal.emit("get", data);
  });

  socket.on("disconnecting", () => {
    console.log(terminal.sockets.size);
  });
});

const files = io.of("/files");

httpServer.listen(8080, () => {
  console.log("Server Started");
});
