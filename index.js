const express = require("express");
require("dotenv").config();
const cors = require("cors");
const {connection} =require("./config/db");
const {PostModel} = require("./model/post.model");
const app= express();

app.use(express.json());
app.use(cors({
    origin:"*"
}))

app.get("/",(req,res)=>{
    res.send("Home Page");
})

app.post("/register",async(req,res)=>{
    try {
        const user = new PostModel(req.body);
        await user.save();
        res.send("User has been registered");
    } catch (error) {
        console.log(error);
        res.send({"msg":"cannot register","error":error.message});
    }
})
app.get("/retrive",async(req,res)=>{
    const {q,sortBy} = req.query;
    let query = {};
    if(q){
        query.destination = q;
    }

    let sort = {};
    if(sortBy){
        const parts = sortBy.split(":");
        sort[parts[0]]= parts[1] === "desc" ? -1:1;
    }
    const usersData = await PostModel.find(query).sort(sort);
    res.send(usersData);
    console.log(usersData);
})

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connection to the db");
    } catch (error) {
        console.log(error);
        console.log("cannot connect to db");
    }
    console.log("server is run on port",process.env.port);
})
