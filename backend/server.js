const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const leadRoutes = require("./routes/leadRoutes");

app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://sumedha:sumedha123@ac-pzz0hwe-shard-00-00.b3osdm1.mongodb.net:27017,ac-pzz0hwe-shard-00-01.b3osdm1.mongodb.net:27017,ac-pzz0hwe-shard-00-02.b3osdm1.mongodb.net:27017/?ssl=true&replicaSet=atlas-12nw1t-shard-0&authSource=admin&appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
  res.send("CRM Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});