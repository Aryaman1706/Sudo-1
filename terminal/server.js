const express = require("express");
const { v4: uuidV4 } = require("uuid");
const { spawn } = require("child_process");

const app = express();

const port = process.env.PORT || 6000;

app.get("/create/:id", async (req, res) => {
  try {
    const roomId = req.params.id;
    console.log(roomId);

    if (!req.query.new) {
      res.status(200).send("Started");
    }

    const container = spawn("docker", [
      "run",
      "-d",
      "-l",
      `roomId=${roomId}`,
      "--env",
      `ROOM_ID=${roomId}`,
      "-p",
      "8080:8080",
      "terminal",
    ]);

    container.stdout.on("data", () => {
      return res.status(200).send("Started");
    });

    container.on("error", () => {
      container.kill();
      return res.status(400).send("Error");
    });

    container.on("exit", () => {
      container.kill();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Retry");
  }
});

app.get("/end/:roomId", (req, res) => {
  //
});

const server = app.listen(port, () => console.log(`Server started on ${port}`));
