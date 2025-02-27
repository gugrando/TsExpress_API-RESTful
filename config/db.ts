import mongoose from "mongoose";
import config from "config";
import Logger from "./logger";

async function conect(){
    const dbUri = config.get<string>("dbUri");
    
    try {
        await mongoose.connect(dbUri);
        Logger.info("DB connected!");
    } catch (err) {
        Logger.error(err);
    }
}

export default conect;