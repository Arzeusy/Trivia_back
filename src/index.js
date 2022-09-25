const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";
const cors = require("cors");

//cors
const whitelist = [
    "http://localhost:4200",
    "https://trivia-front.herokuapp.com/"
];

app.use(cors({origin: whitelist}));

//init
require("dotenv").config({ path: "src/environment/.env" });
require("./database");

//routes
app.use(express.json());
app.use('/api',require('./routes/router'));



app.listen(port,host, () => {
    console.log(`Server running at: http://${host}:${port}/`);
})