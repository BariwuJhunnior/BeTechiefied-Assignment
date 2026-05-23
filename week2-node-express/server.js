require('dotenv').config();

const express = require("express");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8000;

//Json Middleware
app.use(express.json());

//Middleware to log requests
app.use((req, res, next) => {
    console.log({
        method: `${req.method}`,
        url: `${req.url}`,
        date: `${new Date()}`
    });

    next();
});

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Index route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

//Create User route
app.post("/user", (req, res) => {
    const {name, email} = req.body;

    if(!name || !email) return res.status(400).json({
        Error: "Missing Field!"
    })

    res.status(201).send(`Hello, ${name}.`);
});

//Get User with an ID
app.get("/user/:id", (req, res) => {
    const id = req.params.id;

    res.send(`User ${id} profile.`);
})

//Server
app.listen(PORT, () => {
    console.log(`Server Listening at: http://localhost:${PORT}`);
});
