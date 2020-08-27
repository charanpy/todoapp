const express = require("express");
const app = express();
const cors = require("cors")
const bp = require("body-parser")
const { getTask } = require("./Remainder/Remainder")
const cron = require("node-cron")
//DB
const connectDB = require("./db/mongoose");
connectDB();

app.use(express.json({ extended: true }))
app.use(bp.urlencoded({ extended: true }))
app.use(cors())

//Port
const port = process.env.PORT || 5000;

//routers
const auth = require("./routes/auth")
const user = require("./routes/user")
const task = require("./routes/category")
const todo = require("./routes/todo");


app.use("/api/auth", auth)
app.use("/api", user)
app.use("/api/category", task)
app.use("/api/todo", todo)

cron.schedule("36 16 * * *", function () {
            getTask()
});
//getTask();
app.listen(port, () => {
            console.log("Server Started")
})