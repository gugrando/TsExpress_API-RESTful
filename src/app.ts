require("dotenv").config();
import  express from "express";
import config from "config";
import router from "./router";
import Logger from "../config/logger";
import morganMiddleware from "./middleware/morganMiddleware";
import db from "../config/db";


const PORT = config.get<number>("port");
const app = express(); 

app.use(express.json()); //middleware to parse json
app.use(morganMiddleware); //middleware to log HTTP requests
app.use("/api/", router); //padronize routes prefix and path


app.listen(PORT, async () => {
    Logger.info(`Server is up on PORT:${PORT}`);
    await db(); 
});