import * as http from "http";
import express from "express";
import WebSocket from "ws";
import { Message, MessageModule, MessageRequest } from "./types";

const port = 4000;

const app = express();

app.use(express.json());

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

const send = (msg: MessageRequest, module: MessageModule) => {
  const message: Message = {
    type: msg.type,
    module: module,
    payload: msg.payload,
  };
  webSocketServer.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
};

app.post("/controller", (req: express.Request, res: express.Response) => {
  send(req.body, MessageModule.BAKSET);
  res.send({ result: "ok" });
});

app.post("/basket", (req: express.Request, res: express.Response) => {
  send(req.body, MessageModule.BAKSET);
  res.send({ result: "ok" });
});

server.listen(port, () => {
  console.log(`bff running at ${port}`);
});
