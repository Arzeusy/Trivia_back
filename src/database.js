const mongoose = require("mongoose");


// mongodb connection
mongoose.connect(process.env.MONGODB_URI)
    .then((data) => console.log('Connected to MongoDb Atlas'))
    .catch((err) => { console.error('Error MongoDb: ' + err) });
