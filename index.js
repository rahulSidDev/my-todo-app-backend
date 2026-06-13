// import express and create an instance of it.
const express = require("express");
const app = express();

// middleware to parse json
app.use(express.json());

//cookie parser
const cookieParser = require('cookie-parser')
app.use(cookieParser())

const cors = require("cors");

const corsOptions = {
  origin: 'http://localhost:5173', // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// use the dotenv package to load all .env vars into process.env obj.
require("dotenv").config();

// import db config and start the db connection.
const {dbConnect} = require("./config/dbConnect");
dbConnect();

// fetch the port no. from .env file.
const PORT = process.env.PORT || 5000;

// mount the api routes.
const allRoutes = require("./routes/routes");
app.use("/api/v1", allRoutes);

// activate server
app.listen(PORT, () => {
    console.log(`app started on port no. ${PORT}`);
})

// default route
app.get("/", (req, res) => {
    res.send("<h1>This is the homepage</h1>");
})