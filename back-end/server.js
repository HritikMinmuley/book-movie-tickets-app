const express = require("express")
const cors = require("cors")

const connectDB = require("./dbConnection")
const Ticket = require("./schema")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Database Connection
connectDB()

// Test Route
app.get("/", (req, res) => {
    res.send("Backend Running Successfully")
})


// Insert Ticket Data
app.post("/book", async (req, res) => {
    try {
        const ticket = new Ticket(req.body)

        await ticket.save()

        res.status(201).json({
            message: "Ticket Booked Successfully",
            data: ticket
        })
    }
    catch(error) {
        res.status(500).json({
            message: "Error Saving Data"
        })
    }
})


// Get All Tickets
app.get("/tickets", async (req, res) => {
    try {
        const tickets = await Ticket.find()

        res.json(tickets)
    }
    catch(error) {
        res.status(500).json({
            message: "Error Fetching Data"
        })
    }
})


// Start Server
app.listen(5000, () => {
    console.log("Server Running on Port 5000")
})