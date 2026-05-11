const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/bookmyshow")

        console.log("MongoDB Connected Successfully")
    }
    catch(error) {
        console.log("Database Connection Error")
        console.log(error)
    }
}

module.exports = connectDB