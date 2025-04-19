const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(session({secret:"mysupersecretstring"}));
app.use(flash());

app.get("/test",(req,res)=>{
     res.send("test successful");
});

const sessionOptions = ({
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized : true,
});

app.get("/register",(req,res)=>{
    let  {name = "anonymous"} = req.query;
    req.session.name = name ;
    req.flash("success","user regisetered successfully!");
    res.redirect("/hello");
})

app.get("/hello",(req,res)=>{
    res.locals.messages= req.flash("success");
    res.locals.error= req.flash("error");
    res.render("page.ejs",{name:req.session.name});  // tracks the information from register to hello
})

app.get("/reqcount",(req,res)=>{
      if (req.session.count) {
        req.session.count++;
      } else {
        req.session.count = 1;
      }
      res.send(`you sent a request ${req.session.count} times`);
})
