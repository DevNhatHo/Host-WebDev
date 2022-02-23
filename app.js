

//jshint esversion:6
//Declarations
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeWelcomeMessage = " Welcome!, My name is Nat and I'll be your host today! What is your name and how many is in your party? Also, what is the best number to contact you at ? ";
const merchantMessage = "Welcome to the merchant page. You can alert and remove customers from here."

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//uses express function to render home.ejs when diretcory is at localhost:3000
app.get("/", function(req,res){
  res.render("home", {startingContent : homeWelcomeMessage});
})

app.get("/merchant", function(req,res){
  res.render("merchant", {merchantMessage : merchantMessage});
})

mongoose.connect("mongodb://localhost:27017/partyDB" , {useNewUrlParser: true});

const partySchema = {
  name: String,
  number: String,
  party: Number
};

const Party = mongoose.model("Party", partySchema);










app.listen(3000, function(){
  console.log("Server started on port 3000");
})
