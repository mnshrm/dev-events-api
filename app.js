const path = require("path");

const connectDB = require("./db/db");
const errorMiddleware = require("./middlewares/error");
const { eventRouter } = require("./routes/eventRoutes");
const { attendanceRouter } = require("./routes/attendanceRoutes");

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "config", ".env") });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB();

app.use("/event", eventRouter);
app.use("/attendance", attendanceRouter);

app.use(errorMiddleware);

module.exports = app;
