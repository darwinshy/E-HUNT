// Declaring Basic Module for Use
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

// Inititalizing Modules
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// Initialize Passport
app.use(
  require("express-session")({
    secret: "usethisstringcode",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Database Connections
mongoose.connect(
  "mongodb+srv://user:XjVBg3clW5NUTJ3Q@genericdatabase-odlqy.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

// Declaring Database Schema and Initialising Database , Passport
var docSchema = new mongoose.Schema({
  username: String,
  name: String,
  currentQuestion: Number,
  flag: Number,
});
docSchema.plugin(passportLocalMongoose);
var User = mongoose.model("users", docSchema);

// Session Initiliasation
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.get("/", function (req, res) {
  res.render("home.ejs");
});

app.get("/register/new", function (req, res) {
  res.render("register.ejs", { warning: "" });
});
app.get("/register/userexits", function (req, res) {
  res.render("register.ejs", { warning: "Username Exists" });
});
app.get("/login/new", function (req, res) {
  res.render("login.ejs", { error: "" });
});
app.get("/login/usernamenotfound", function (req, res) {
  res.render("login.ejs", { error: "Username was not found" });
});
app.get("/:username/leaderboards/currentstanding", function (req, res) {
  var username = req.params.username;
  User.find({ flag: 1 }, function (err, users) {
    if (err) console.log(err);
    else {
      res.render("leaderboards.ejs", { users: users, currentUser: username });
    }
  }).sort({ currentQuestion: -1 });
});

// Logics

app.post("/registering/new", function (req, res) {
  console.log("Restration Started");
  if (!(req.body.username && req.body.name)) {
    console.log("Form data is Not valid");
    res.redirect("/register/new");
  } else {
    User.findOne({ username: req.body.username }).then((currentUser) => {
      if (currentUser) {
        res.redirect("/register/userexits");
      } else {
        console.log("Creating New User");
        new User({
          username: req.body.username,
          name: req.body.name,
          currentQuestion: 1,
          flag: 1,
        })
          .save()
          .then((newUser) => {
            console.log("Strategy Callback: " + newUser + " was created");
            res.redirect("/" + newUser.username + "/false");
          });
      }
    });
  }
});
app.post("/login/exist", function (req, res) {
  console.log("Restration Started");
  if (!req.body.username) {
    console.log("Form data is Not valid");
    res.redirect("/login/new");
  } else {
    User.findOne({ username: req.body.username }).then((currentUser) => {
      if (currentUser) {
        console.log("User Found in Database: " + currentUser);
        res.redirect("/" + currentUser.username + "/true");
      } else {
        res.redirect("/login/usernamenotfound");
      }
    });
  }
});
app.get("/:username/:existing", function (req, res) {
  var exists;
  if (req.params.existing == "true") exists = true;
  User.findOne({ username: req.params.username }).then((user) => {
    res.render("instructions.ejs", {
      existing: exists,
      user: user,
    });
  });
});

// Logic for verifying the Answers
app.post("/:username/:n", function (req, res) {
  User.findOne({ username: req.params.username }).then((user) => {
    var q = req.params.n;
    if (q == "start" || q == "resume") {
      res.render(user.currentQuestion + ".ejs", { user: user });
    }
    if (q == 2) {
      if (req.body.answer == "edgar") {
        User.updateOne(
          { username: req.params.username },
          { $set: { currentQuestion: q } },
          function (err, result) {
            res.render(q + ".ejs", { user: user });
          }
        );
        console.log(user.currentQuestion);
      } else {
        res.render("error.ejs");
      }
    }

    if (q == 3) {
      if (req.body.answer == "C++") {
        User.updateOne(
          { username: req.params.username },
          { $set: { currentQuestion: q } },
          function (err, result) {
            res.render(q + ".ejs", { user: user });
          }
        );
        console.log(user.currentQuestion);
      } else {
        res.render("error.ejs");
      }
    }

    if (q == 4) {
      if (req.body.answer == "chetanbhagat") {
        User.updateOne(
          { username: req.params.username },
          { $set: { currentQuestion: q } },
          function (err, result) {
            res.render(q + ".ejs", { user: user });
          }
        );
        console.log(user.currentQuestion);
      } else {
        res.render("error.ejs");
      }
    }

    if (q == 5) {
      if (req.body.answer == "shirt") {
        User.updateOne(
          { username: req.params.username },
          { $set: { currentQuestion: q } },
          function (err, result) {
            res.render(q + ".ejs", { user: user });
          }
        );
        console.log(user.currentQuestion);
      } else {
        res.render("error.ejs");
      }
    }

    if (q == 6) {
      if (req.body.answer == "helloworld") {
        User.updateOne(
          { username: req.params.username },
          { $set: { currentQuestion: q } },
          function (err, result) {
            res.render(q + ".ejs", { user: user });
          }
        );
        console.log(user.currentQuestion);
      } else {
        res.render("error.ejs");
      }
    }
    if (q == 7) {
      if (req.body.answer == "625") {
        User.updateOne(
          { username: req.params.username },
          { $set: { currentQuestion: q } },
          function (err, result) {
            res.render(q + ".ejs", { user: user });
          }
        );
        console.log(user.currentQuestion);
      } else {
        res.render("error.ejs");
      }
    }
    if (q == 8) {
      if (req.body.answer == "18") {
        User.updateOne(
          { username: req.params.username },
          { $set: { currentQuestion: q } },
          function (err, result) {
            res.render(q + ".ejs", { user: user });
          }
        );
        console.log(user.currentQuestion);
      } else {
        res.render("error.ejs");
      }
    }
    if (q == 9) {
      if (req.body.answer == "longtrunks") {
        User.updateOne(
          { username: req.params.username },
          { $set: { currentQuestion: q } },
          function (err, result) {
            res.render(q + ".ejs", { user: user });
          }
        );
        console.log(user.currentQuestion);
      } else {
        res.render("error.ejs");
      }
    }
    if (q == 10) {
      if (req.body.answer == "huntlive") {
        User.updateOne(
          { username: req.params.username },
          { $set: { currentQuestion: q } },
          function (err, result) {
            res.render(q + ".ejs", { user: user });
          }
        );
        console.log(user.currentQuestion);
      } else {
        res.render("error.ejs");
      }
    }
    if (q == 11) {
      if (req.body.answer == "smart") {
        User.updateOne(
          { username: req.params.username },
          { $set: { currentQuestion: q } },
          function (err, result) {
            res.render(q + ".ejs", { user: user });
          }
        );
        console.log(user.currentQuestion);
      } else {
        res.render("error.ejs");
      }
    }
    if (q == 12) {
      if (req.body.answer == "ampersand") {
        User.updateOne(
          { username: req.params.username },
          { $set: { currentQuestion: q } },
          function (err, result) {
            res.render(q + ".ejs", { user: user });
          }
        );
        console.log(user.currentQuestion);
      } else {
        res.render("error.ejs");
      }
    }
  });
});

// Questions

// Port Listening
app.listen(process.env.PORT || 3000, function () {
  console.log("SERVER STARTED");
});
