import express from "express"
import cors from "cors"
import userRouters from "./Routers/users.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRouters)

app.listen(8800);
