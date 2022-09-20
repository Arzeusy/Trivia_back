const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

//cors
const whitelist = [
    "http://localhost:4200"
];

app.use(cors({origin: whitelist}));

//init
require("dotenv").config({ path: "src/environment/.env" });
require("./database");

//routes
app.use(express.json());
app.use('/api',require('./routes/router'));



app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}/`);
})