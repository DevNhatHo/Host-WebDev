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

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/partyDB", {
  useNewUrlParser: true
});

//mongoose Schema
const partysSchema = {
  name: String,
  number: Number,
  party: Number
};

const Party = mongoose.model("Party", partysSchema);

const party1 = new Party({
  name: "Bee",
  number: 6195186777,
  party: 1
})

const party2 = new Party({
  name: "John",
  number: 5598287272,
  party: 2
})

const party3 = new Party({
  name: "Michelle",
  number: 858626288,
  party: 9
})

const defaultPartys = [party1, party2, party3];



//uses express function to render home.ejs when diretcory is at localhost:3000
app.get("/", function(req, res) {
  Party.find({}, function(err, foundPartys) {

    console.log(foundPartys);

    if (foundPartys.length === 0) {
      Party.insertMany(defaultPartys, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Succesfully saved partys to database");
        }
      });
    } else {
      console.log("Array is not empty");


    }

  });
  res.render("home", {
    startingContent: homeWelcomeMessage
  });

  //Checks if array is empty then inserts default party db to array






});


app.get("/merchant", function(req, res) {
  Party.find({}, function(err, foundPartys) {

    console.log(foundPartys);

    if (foundPartys.length != 0) {


      res.render("merchant", {
        merchantMessage: merchantMessage,
        foundPartys: foundPartys


      });


    };
  });


});









app.post("/", function(req, res) {

  const partyName = req.body.postName
  const partyNumber = req.body.postNumber
  const partyParty = req.body.postParty


  const party = new Party({
    name: req.body.postName,
    number: req.body.postNumber,
    party: req.body.postParty
  });
  party.save();
  res.redirect("/")
});

app.post("/delete", function(req, res) {

  const checkedItemId = req.body.checkbox;
  console.log(checkedItemId);


  Party.findByIdAndRemove(checkedItemId, function(err) {
    if (!err) {
      console.log("Succesfully pinged party!");
      console.log(checkedItemId);
      res.redirect("/merchant")
    }
  });




});









app.listen(3000, function() {
  console.log("Server started on port 3000");
})
