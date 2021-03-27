const httpServer = require("http").createServer();

const endpoint = `/${process.env.ROOM_ID}` || "/";

const io = require("socket.io")(httpServer, {
  path: `/socket.io${endpoint}`,
  cors: {
    origin: "*",
  },
});

const terminal = io.of("/pty");

const pty = require("node-pty");

const ptyProcess = pty.spawn("sh", [], {
  name: "PTY",
  cols: 80,
  rows: 30,
  cwd: "/home/app",
  env: process.env,
});

terminal.on("connection", (socket) => {
  socket.on("set", (data) => {
    ptyProcess.write(data);
  });

  ptyProcess.on("exit", () => {
    ptyProcess.resume();
  });

  ptyProcess.on("data", (data) => {
    terminal.emit("get", data);
  });

  socket.on("disconnecting", () => {
    console.log(terminal.sockets.size);
  });
});

httpServer.listen(8080, () => {
  console.log("Server Started");
});
