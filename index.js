const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const userRoutes = require("./routes/UserHandlers");


const port = process.env.port || 5000

//config the env
dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    // useUnifiedTopology: true
})


const userRoutes = require("./routes/Routes");

app.use(express.json());
app.use("/api/v1/users", userRoutes);


//calling the port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

})