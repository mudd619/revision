const express = require("express");
const connect = require("./configs/db");
const cors = require("cors")

const studentSchema = require("./controllers/studentContoller");
const contestSchema = require("./controllers/contestController")

const app = express();
app.use(express.json());
app.use(cors())

app.use("/student",studentSchema);
app.use("/contest",contestSchema)


app.listen(2345,async()=>{
    await connect()
    console.log("Listening to port 2345")
})