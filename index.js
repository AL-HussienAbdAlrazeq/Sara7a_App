import path from 'path'
import express from "express";
import bootstrap from "./src/app.controller.js";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join("./src/config/.env") });
const app = express();
const port = 3000;
bootstrap(app, express);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
