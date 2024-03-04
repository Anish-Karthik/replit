import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer } from "http";
import { initWs } from "./ws";
import { initHttp } from "./http";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const server = createServer(app);
initWs(server);
initHttp(app);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
