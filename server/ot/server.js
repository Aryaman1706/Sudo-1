const http = require("http");
const express = require("express");
const ShareDB = require("sharedb");
const WebSocket = require("ws");
const WebSocketJSONStream = require("@teamwork/websocket-json-stream");
const json1 = require("ot-json1");
const path = require("path");

ShareDB.types.register(json1.type);
const db = require("sharedb-mongo")(
  "mongodb+srv://owasp:owasp@codetrade-dev.5vb7f.mongodb.net/codetrade-dev?authSource=admin&replicaSet=atlas-43y8cj-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
);
const share = new ShareDB({ db });

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server });
server.listen(8080);
console.log("Server started on port 8080");

wss.on("connection", (ws) => {
  console.log("Ws connected");
  const stream = new WebSocketJSONStream(ws);
  share.listen(stream);
});

var connection = share.connect();

// app.get("/:id", async (req, res) => {
// connection.createFetchQuery("documents", {}, {}, (err, results) => {
//   console.log(results);
//   if (results.length === 0) {
//     c = connection.get("documents", "123");
//     doc.fetch((err) => {
//       if (err) throw err;

//       if (doc.type === null) {
//         doc.create({ code: "Hello World!" }, "ot-json1", (err) => {
//           console.log("document created.");
//         });
//       }
//     });
//   }
// });
const doc = connection.get("documents", "123");
doc.fetch((err) => {
  if (err) throw err;

  if (doc.type === null) {
    doc.create({ code: "Hello World!" }, (err) => {
      console.log("doc created");
    });
  }
});

app.use(
  express.static(path.resolve(__dirname, "../", "../", "client", "build"))
);
app.get("/*", async (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../", "../", "client", "build", "index.html")
  );
});
// });
