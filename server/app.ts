import dotenv from "dotenv";
import express from "express";
import router from "./router/index";

const app = express();


dotenv.config();



app.use(express.json())


app.use((req, res, next) => {
    // Set headers -> CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, JWT");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.use(router)

app.get("/", (req, res) => {
    res.send("Hello World!");
})



export default app;