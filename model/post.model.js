const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
    name:String,
    email:String,
    destination:String,
    travellers:String,
    budgetPerPerson:Number
},{
    versionKey:false
});

const PostModel = mongoose.model("user",postSchema);

module.exports={
    PostModel
}