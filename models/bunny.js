const mongoose = require("mongoose");

// Creating the schema

// model structure
const bunnySchema = new mongoose.Schema({
    name: String,
    isDwarf: Boolean,
    isGiant: Boolean,
    isLop: Boolean,
    
})

// Register the model

const Bunny = mongoose.model("Bunny", bunnySchema); // create model
// name model with capital ^ Fruit not fruit

// Export the model

module.exports = Bunny;
