const express = require("express");
const { v4: uuidV4 } = require("uuid");
const { spawn } = require("child_process");

const app = express();

const port = process.env.PORT || 6000;

app.get("/create", async (req, res) => {
  try {
    const roomId = uuidV4();
    console.log(roomId);

    const container = spawn("docker", [
      "run",
      "-d",
      "-l",
      `roomId=${roomId}`,
      "--env",
      `ROOM_ID=${roomId}`,
      "terminal",
    ]);

    container.stdout.on("data", () => {
      res.status(200).send("Started");
    });

    container.on("error", () => {
      container.kill();
      res.status(400).send("Error");
    });

    container.on("exit", () => {
      container.kill();
      res.status(400).send("Error");
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Retry");
  }
});

app.get("/end/:roomId", (req, res) => {
  //
});

const server = app.listen(port, () => console.log(`Server started on ${port}`));
