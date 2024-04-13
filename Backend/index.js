const express = require("express");
require("dotenv").config()
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000
const connect = require("./config/connect");
const TopicRoutes = require("./Routes/TopicRoutes")
const UserRoutes = require("./Routes/UserRoutes")

app.use(express.json());
app.use(cors());
app.route('/').get((req,res)=>{
  res.send("This is LearnWise Backend Route")
})

connect().then(response=>{
  console.log(response);
  app.get("/",(req,res)=>{
      res.send(response)
  })
}).catch(response=>{
  console.log(response);
  app.get("/",(req,res)=>{
      res.send(response)
  })
})

app.use("/api/topicdatas",TopicRoutes)
app.use("/api/userdatas",UserRoutes)

app.listen(port, () => {
  console.log(`App is running on PORT: ${port}`);
});
