// DEPENDENCIES


// Express
const express = require('express');

// Ejs
const ejs = require('express');

// Env
const dotenv = require("dotenv");
dotenv.config(); // loads environment variables

// Mongoose
const mongoose = require("mongoose");


// DEFINING
const port = 3001
const app = express();

// MIDDLEWARE

// connection status in terminal
mongoose.connect(process.env.MONGODB_URI); // database connection

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


// ROUTES

// GET / root route
app.get("/", async (req, res) => {
    res.render("index.ejs");
});


// Listening setup
app.listen(port, () => {
    console.log(`Listening on port:`, port);
});
