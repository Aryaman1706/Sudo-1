const httpServer = require("http").createServer();
const fs = require("fs");
const path = require("path");

const endpoint = process.env.ROOM_ID
  ? `/${process.env.ROOM_ID}/`
  : "/socket.io/";
const io = require("socket.io")(httpServer, {
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

let count = 0;
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

// const files = io.of("/files");
// files.on("connection", (socket) => {
//   let active = null;
//   let dir = [];

//   const createNewFile = (name) => {
//     dir = [...dir, name];
//     const active = fs.createWriteStream(path.resolve(__dirname, `/${name}`));
//     active.cork();
//   };

//   const writeActiveFile = (data) => {
//     if (active) {
//       active.write(data);
//     }
//   };

//   const saveFile = () => {
//     if (active) {
//       process.nextTick(() => {
//         active.uncork();
//       });
//     }
//   };

//   const switchActive = (name) => {
//     if (active) {
//       process.nextTick(() => {
//         active.uncork();
//       });
//       active.destroy();

//       active = fs.createWriteStream(path.resolve(__dirname, `/${name}`));
//     }
//   };

//   socket.on("createNew", (name) => {
//     //
//   });

//   socket.on("writeOn", (data) => {
//     //
//   });

//   socket.on("switch", (name) => {
//     //
//   });
// });

httpServer.listen(8080, () => {
  console.log("Server Started");
});
