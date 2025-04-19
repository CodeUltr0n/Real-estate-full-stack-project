const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");


/// signed cookies : - verify and security
app.use(cookieParser("secretcode"));

app.get("/getsignedcookie",(req,res)=>{
    res.cookie("made-in","india",{signed:true});
    res.send("signed cookie sent");
});

app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
    res.send("verified");
});


/// cookies route
app.get("/getcookies",(req,res)=>{
    res.cookie("greet", "nameste");
    res.cookie("madein","india");
    res.send("sent you some cookies!");
});

/// cookie parsing
app.get("/greet",(req,res)=>{
    let{name = "anonymous"} = req.cookies;
    res.send(`hi,${name}`);
}) 

/// cookies
app.get("/",(req,res)=>{
    console.dir(req.cookies);
    res.send("hi iam root")
}) 


