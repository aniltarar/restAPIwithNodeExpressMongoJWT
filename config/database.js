const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDatabase = () => {
    mongoose.connect(MONGO_URI).then(() => {
        console.log("MongoDB Connection Successful");
    }).catch(err => {
        console.log(err);
    });
};



module.exports = connectDatabase;
