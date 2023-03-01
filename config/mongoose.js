const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/socializer_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error while connecting to the MongoDB"));

db.once('open', function(){
    console.log("Connected to the Database :: MongoDB");
});

module.exports = db;