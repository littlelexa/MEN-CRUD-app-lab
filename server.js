// DEPENDENCIES


// Express
const express = require("express");

// Ejs
const ejs = require("express");

// Env
const dotenv = require("dotenv");
dotenv.config(); // loads environment variables

// Mongoose
const mongoose = require("mongoose");

// Method-override and morgan
const methodOverride = require("method-override");
const morgan = require("morgan");


// DEFINING
const port = 3001;
const app = express();

// MIDDLEWARE

// connection status in terminal
mongoose.connect(process.env.MONGODB_URI); // database connection

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Bunny = require("./models/bunny.js");

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));
app.use(morgan("dev"));

// ROUTES

// Home
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

// Index
app.get("/bunnies", async (req, res) => {
    const allBunnies = await Bunny.find();
    console.log(allBunnies)
    res.render("bunnies/index.ejs", {bunnies: allBunnies});
});

// New
app.get("/bunnies/new", async (req,res)=>{
    res.render("bunnies/new.ejs")
});

// Delete
app.delete("/bunnies/:bunnyId", async (req,res) => {
    await Bunny.findByIdAndDelete(req.params.bunnyId);
    res.redirect("/bunnies");
    // res.send("delete route")
});

// Update
app.put("/bunnies/:bunnyId", async (req,res) => {
    if (req.body.isLop === "on"){
        req.body.isLop = true;
    }else {
        req.body.isLop = false;
    }
    if (req.body.isDwarf === "on"){
        req.body.isDwarf = true;
        req.body.isGiant = false;
        
    } else if (req.body.isGiant === "on"){
        req.body.isDwarf = false;
        req.body.isGiant = true;
    } else {
        req.body.isGiant = false;
    }
    await Bunny.findByIdAndUpdate(req.params.bunnyId, req.body);

    res.redirect(`/bunnies/${req.params.bunnyId}`);

});

// Create
app.post("/bunnies", async (req, res)=>{
    console.log(req.body);
    if (req.body.isLop === "on"){
        req.body.isLop = true
    }else {
        req.body.isLop = false
    }
    if (req.body.isDwarf === "on"){
        req.body.isDwarf = true;
        req.body.isGiant = false;
        
    } else if (req.body.isGiant === "on"){
        req.body.isDwarf = false;
        req.body.isGiant = true
    } else {
        req.body.isGiant = false
        req.body.isDwarf = false

    }
    await Bunny.create(req.body);
    res.redirect("/bunnies");
});

// Edit
app.get("/bunnies/:bunnyId/edit", async (req,res) => {
    const foundBunny = await Bunny.findById(req.params.bunnyId);
    console.log(foundBunny);
    res.render("bunnies/edit.ejs", {
        bunny: foundBunny,
    })
});

// Show
app.get("/bunnies/:bunnyId", async (req,res) => {
    const foundBunny = await Bunny.findById(req.params.bunnyId);
    res.render("bunnies/show.ejs", {bunny: foundBunny});
});

// Listening setup
app.listen(port, () => {
    console.log(`Listening on port:`, port);
});
