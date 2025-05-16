const { default: mongoose } = require("mongoose");

//schema
const userSchema = new mongoose.Schema({
    //json objs 
    name: {
        type: String,
        require: true,
        trim: true,
        min: 5,
        max: 20,
    },

    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/,
    },
    age: {
        type: Number,
        require: true,
        min: 0,
        max: 120,
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    }

})

//export the schema
module.exports = mongoose.model("user", userSchema)