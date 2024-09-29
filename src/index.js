const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const collection = require("./mongodb")
const cookieParser = require("cookie-parser")
const templatePath = path.join(__dirname,'../templates')
const bcrypt = require('bcrypt');

app.use(express.json())
app.set("view engine","hbs")
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.get("/",(req,res)=>{ 
    res.cookie("name","harsh");
    res.render("welcome")
})
app.get("/login",(req,res)=>{ 
    console.log(req.cookies);
    res.render("login")
})
app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",async(req,res)=>{
    // const saltRounds = 10;
    const encoded_pass="";
    bcrypt.genSalt(10).then(salt=>{
        console.log("1");

        console.log(salt);
    }).catch(err=>{
        console.log("2");

        console.log(err);
    })
    const data ={
        name : req.body.name,
        password: encoded_pass,
        createdAt:new Date().toISOString(),
        updatedAt:new Date().toISOString()

    };
    console.log(data.name , data.password)
    await collection.insertMany([data])
    res.render("welcome")
});

app.post("/login",async(req,res)=>{
    try{
        const check = await collection.findone({name:req.body.name})
        if(check.password === req.body.password){
            res.render("welcome")
        }
        else{
            res.send("wrong password")
        }
    }
    catch{
        res.send("wrong details")
    }
})


app.listen(3000,()=>{
    console.log("port connected");
})