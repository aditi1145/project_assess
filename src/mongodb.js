const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/server").then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("failed to connect");
})

const LoginInSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
        },
    password :{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now, 
      },
    updatedAt: {
        type: Date,
        default: Date.now, 
      }
})

const collection = new mongoose.model("Collection1",LoginInSchema)

module.exports = collection