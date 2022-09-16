const express = require("express");
const app = express();
const port = process.env.PORT || 9000;
const mongoose = require("mongoose");
require("dotenv").config({path:"src/environment/.env"});

//routes 
app.use(require('./routes/router'));



// mongodb connection
mongoose.connect( process.env.MONGODB_URI )
.then(
    (data) => console.log('Connected to MongoDb Atlas', data)
)
.catch(
    (err) => {
        console.error('error en coneccion a mongodb :' + err)
    }
);



app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}/`);
})