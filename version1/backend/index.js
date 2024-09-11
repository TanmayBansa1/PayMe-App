const express = require("express");
const app = express();

const jwt_secret = require("./config")
const mainRouter = require("./routes/index");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);


app.listen(3000);

