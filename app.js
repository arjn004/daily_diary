//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hello, Have something in mind ? Go on Use this website as your personal Diary for whatever you want to right and keep it to yourself with our best encryption technology.";
const aboutContent = "This is a project website made by Student who is pursuing B.Tech form Lovely Professional University, purpose of this website is to keep your own personal diary for your daily work and thoughts. Keep using it and He is happy to contribute this roject for public use.";

const app = express();

var posts = [];


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
 res.render("home", {
  home1: homeStartingContent,
  posts: posts
});
});

app.get("/about", function(req, res){
  res.render("about", {about1: aboutContent});
});


app.get("/contact", function(req, res){
  res.render("contact");
});

app.get("/compose", function(req, res){
  res.render("compose");
});
app.post("/compose", function(req, res){
  const post = {
  title : req.body.postTitle,
  content : req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req, res){
  const reqpost = _.lowerCase(req.params.postName);
  var m = 0;
  posts.forEach(function(post){
      storedtitle = _.lowerCase(post.title);
    if(storedtitle === reqpost){
      res.render("post", {titling: post.title, posting: post.content});
    };
  });
});



app.listen(process.env.PORT, function() {
  console.log("Server started on port 3000");
});
