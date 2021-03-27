const httpServer = require("http").createServer();

// const endpoint = `/${process.env.ROOM_ID}` || "/";

const io = require("socket.io")(httpServer, {
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
  env: process.env,
});

terminal.on("connection", (socket) => {
  console.log("connected");

  socket.on("set", (data) => {
    console.log("set ", data);
    ptyProcess.write(data);
  });

  ptyProcess.onExit(() => {
    ptyProcess.resume();
  });

  ptyProcess.onData((data) => {
    console.log("get ", data);
    terminal.emit("get", data);
  });

  socket.on("disconnecting", () => {
    console.log(terminal.sockets.size);
  });
});

httpServer.listen(8080, () => {
  console.log("Server Started");
});
