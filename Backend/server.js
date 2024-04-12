const express = require("express");
require("dotenv").config()
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000
const connectDB = require("./config/db");

app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/Topics",require("./Routes/TopicRoutes"))
app.use("/api/Users",require("./Routes/UserRoutes"))

app.listen(port, () => {
  console.log(`App is running on PORT: ${port}`);
});
