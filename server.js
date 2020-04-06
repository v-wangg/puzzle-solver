const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const keys = require('./config/keys.js');
const cors = require('cors');

// require('./models/user');

// mongoose.connect(keys.MONGO_URI);
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("Connected to MongoDB")
// });

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/static/*', function(req, res){
    path = req.params[0] ? req.params[0] : 'index.html';
    res.sendfile(path, {root: './cv/static'});
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    const path = require('path');
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

const PORT = process.env.PORT || 4000
app.listen(PORT);
console.log("Server listening on port", PORT);
