import  express from "express";
import config from "config";
import router from "./router";

const PORT = config.get<number>("port");
const app = express(); 
app.use(express.json()); //middleware to parse json
app.use("/api/", router); //padronize routes prefix and path

app.listen(PORT, async () => {
    console.log(`Server running on port${PORT}`);
});